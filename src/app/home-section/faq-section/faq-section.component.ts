import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

interface Faq { q: string; a: string; cat: string }

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.less',
  encapsulation: ViewEncapsulation.None
})
export class FaqSectionComponent {
  categories = ['All', 'Projects', 'Pricing', 'Technology', 'Support'];
  active = signal('All');

  trust = [
    { icon: 'bi-clock', text: 'Reply within one business day' },
    { icon: 'bi-file-earmark-check', text: 'Fixed-scope quotes, no surprise invoices' },
    { icon: 'bi-code-slash', text: 'You own all source code' }
  ];

  private faqs: Faq[] = [
    { cat: 'Projects', q: 'What is included in a software or web project?',
      a: 'We handle discovery, UI/UX design, development, testing, cloud deployment and handover. You receive the full source code and documentation, and you own everything we build.' },
    { cat: 'Projects', q: 'How long does a project take?',
      a: 'A business website usually takes 3 to 5 weeks. Web and mobile apps typically take 3 to 6 months, delivered in two-week sprints with a working demo at the end of each one.' },
    { cat: 'Technology', q: 'Can you work with our existing tools and technology?',
      a: 'Yes. We work with Angular, React, Node.js, .NET, Java, AWS, Azure and Google Cloud, and we integrate with your current systems, APIs and databases instead of forcing a rebuild.' },
    { cat: 'Support', q: 'Do you support us after launch?',
      a: 'Yes. Our support plans cover monitoring, security updates, bug fixes, improvements and 24/7 incident response, with response times agreed in writing.' },
    { cat: 'Pricing', q: 'How do you price projects?',
      a: 'After a short discovery phase you receive a fixed-scope quote with milestones. For ongoing work you can choose a monthly retainer or a dedicated team.' }
  ];

  visible = computed(() => this.active() === 'All' ? this.faqs : this.faqs.filter(f => f.cat === this.active()));
}