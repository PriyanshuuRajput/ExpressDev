import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

interface Action { label: string; icon: string; outline?: boolean; href?: string; prompt?: string }
interface FileInfo { name: string; size: string; icon: string }
interface Msg { id: number; from: 'bot' | 'me'; time: string; text?: string; file?: FileInfo; actions?: Action[] }
interface Chip { icon: string; label: string }

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.less',
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scroller') scroller?: ElementRef<HTMLElement>;
  @ViewChild('field') field?: ElementRef<HTMLInputElement>;
  @ViewChild('picker') picker?: ElementRef<HTMLInputElement>;

  open = signal(false);
  expanded = signal(false);
  typing = signal(false);
  unread = signal(1);
  tooltip = signal(false);
  draft = signal('');
  pendingFile = signal<File | null>(null);
  messages = signal<Msg[]>([]);

  canSend = computed(() => !this.typing() && (this.draft().trim().length > 0 || !!this.pendingFile()));
  showChips = computed(() => this.messages().length === 1 && !this.typing());

  chips: Chip[] = [
    { icon: 'bi-file-earmark-text', label: 'Get a project quote' },
    { icon: 'bi-lightbulb', label: 'Discuss a new idea' },
    { icon: 'bi-tools', label: 'Technical support' },
    { icon: 'bi-grid-3x3-gap', label: 'Our services' },
    { icon: 'bi-people', label: 'Hire a dedicated team' }
  ];

  private nextId = 1;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private readonly maxBytes = 5 * 1024 * 1024;

  ngOnInit() {
    this.messages.set([{ id: this.nextId++, from: 'bot', time: this.now(),
      text: 'Hi there! Welcome to ExpressDev Technologies. How can I help you today?' }]);
    this.timers.push(setTimeout(() => { if (!this.open()) this.tooltip.set(true); }, 2500));
    this.timers.push(setTimeout(() => this.tooltip.set(false), 11000));
  }
  ngOnDestroy() { this.timers.forEach(clearTimeout); }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.open()) this.close(); }

  toggle() { this.open() ? this.close() : this.openChat(); }
  openChat() {
    this.open.set(true); this.tooltip.set(false); this.unread.set(0);
    this.timers.push(setTimeout(() => this.field?.nativeElement.focus(), 260));
    this.scrollDown();
  }
  close() { this.open.set(false); }

  send(override?: string) {
    const text = (override ?? this.draft()).trim();
    const file = override ? null : this.pendingFile();
    if (!text && !file) return;
    if (this.typing()) return;

    const out: Msg[] = [];
    if (file) out.push({ id: this.nextId++, from: 'me', time: this.now(), file: { name: file.name, size: this.fmt(file.size), icon: this.iconFor(file.name) } });
    if (text) out.push({ id: this.nextId++, from: 'me', time: this.now(), text });
    this.messages.update(m => [...m, ...out]);
    this.draft.set(''); if (this.field) this.field.nativeElement.value = '';
    this.pendingFile.set(null); if (this.picker) this.picker.nativeElement.value = '';
    this.scrollDown();

    // Simulated reply. Replace the body of this timeout with a call to your backend or AI API.
    this.typing.set(true); this.scrollDown();
    this.timers.push(setTimeout(() => {
      this.typing.set(false);
      const r = this.reply(text, file);
      this.messages.update(m => [...m, { id: this.nextId++, from: 'bot', time: this.now(), ...r }]);
      if (!this.open()) this.unread.update(n => n + 1);
      this.scrollDown();
    }, 1100 + Math.random() * 600));
  }

  pickFile(ev: Event) {
    const f = (ev.target as HTMLInputElement).files?.[0];
    if (!f) return;
    if (f.size > this.maxBytes) {
      this.messages.update(m => [...m, { id: this.nextId++, from: 'bot', time: this.now(), text: 'That file is larger than 5 MB. Please send a smaller file or email it to us.' }]);
      (ev.target as HTMLInputElement).value = ''; this.scrollDown(); return;
    }
    this.pendingFile.set(f);
  }
  clearFile() { this.pendingFile.set(null); if (this.picker) this.picker.nativeElement.value = ''; }

  private reply(text: string, file: File | null): { text: string; actions?: Action[] } {
    const t = text.toLowerCase();
    const call: Action = { label: 'Schedule a call', icon: 'bi-calendar-event', href: '#contact' };
    if (file) return { text: `Thanks, I've received ${file.name}. An engineer will review it and reply within one business day.`, actions: [call] };
    if (/quote|price|pricing|cost|budget/.test(t)) return { text: 'We give fixed-scope quotes after a short discovery call, so there are no surprise invoices. Projects start from $2,500 for websites and $12,000 for custom apps.', actions: [call, { label: 'View pricing', icon: 'bi-tag', outline: true, href: '#pricing' }] };
    if (/hire|team|developer|engineer|staff/.test(t)) return { text: 'We can build you a dedicated team of engineers, designers and QA, managed by us or working inside your own process.', actions: [call] };
    if (/support|bug|issue|problem|error|down/.test(t)) return { text: 'Sorry to hear that. Tell me what is happening, or book a call and an engineer will look at it with you. Retainer clients get 24/7 incident response.', actions: [call] };
    if (/service|offer|what do you do/.test(t)) return { text: 'We cover custom software, web and mobile apps, cloud and DevOps, cybersecurity, AI and data, UI/UX design, QA and managed IT support.', actions: [{ label: 'See services', icon: 'bi-grid-3x3-gap', outline: true, href: '#services' }, call] };
    if (/web|app|software|website|custom|platform|idea/.test(t)) return { text: 'Absolutely! We build custom web applications tailored to your business needs.\n\nWould you like to schedule a free consultation to discuss your requirements in detail?', actions: [call, { label: 'Learn more', icon: 'bi-info-circle', outline: true, prompt: 'What services do you offer?' }] };
    return { text: 'Thanks for your message! An engineer will follow up shortly. You can also book a free call or tell me more about your project.', actions: [call] };
  }

  private now() { return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
  private fmt(b: number) { return b < 1048576 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1048576).toFixed(1)} MB`; }
  private iconFor(name: string) {
    const e = name.split('.').pop()?.toLowerCase() ?? '';
    return e === 'pdf' ? 'bi-file-earmark-pdf' : ['png', 'jpg', 'jpeg', 'webp'].includes(e) ? 'bi-file-earmark-image' : 'bi-file-earmark-text';
  }
  private scrollDown() {
    this.timers.push(setTimeout(() => this.scroller?.nativeElement.scrollTo({ top: this.scroller.nativeElement.scrollHeight, behavior: 'smooth' }), 30));
  }
}