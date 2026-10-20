import { NgClass } from '@angular/common';
import {Component,OnDestroy,OnInit,ViewEncapsulation,computed,signal,} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Slide {
  id: string;
  tabLabel: string;
  tabClass: string;
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  text: string;
  cta: string;
}

interface Service {
  icon: string;
  label: string;
}

interface Node {
  x: number;
  y: number;
  r: number;
  hub: boolean;
}

interface Link {
  d: string;
  hub: boolean;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgClass, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.less',
  encapsulation: ViewEncapsulation.None,
})

export class HeroSectionComponent implements OnInit, OnDestroy {
  private autoSlideInterval?: ReturnType<typeof setInterval>;

  direction = signal<'left' | 'right'>('left');
  readonly slideDuration = 5000;
  readonly timerProgress = signal(0);

  private timerInterval?: ReturnType<typeof setInterval>;
  private timerStartedAt = 0;
  
  readonly slides: Slide[] = [
    {
      id: 'software',
      tabLabel: 'Software & engineering',
      tabClass: 'hero-tab--building',
      eyebrow: 'Software & digital engineering',
      titleMain: 'Build what’s next.',
      titleAccent: 'Better.',
      text: 'Custom software, cloud platforms and AI solutions for your business.',
      cta: 'Explore our services',
    },
    {
      id: 'cloud',
      tabLabel: 'Cloud & AI',
      tabClass: 'hero-tab--cloud',
      eyebrow: 'Cloud & AI',
      titleMain: 'Scale with.',
      titleAccent: 'Smarter.',
      text: 'Modern cloud, data and AI solutions to accelerate your growth.',
      cta: 'See cloud services',
    },
    {
      id: 'digital',
      tabLabel: 'Digital products',
      tabClass: 'hero-tab--digital',
      eyebrow: 'Digital products',
      titleMain: 'Design products',
      titleAccent: 'people love.',
      text: 'User-focused design and engineering from concept to launch.',
      cta: 'View product work',
    },
    {
      id: 'company',
      tabLabel: 'Company overview',
      tabClass: 'hero-tab--company',
      eyebrow: 'Company overview',
      titleMain: 'A partner you can',
      titleAccent: 'rely on.',
      text: 'Expert teams and reliable delivery for long-term partnerships.',
      cta: 'About our company',
    },
  ];

  readonly services: Service[] = [
    { icon: 'bi bi-code-slash', label: 'Custom software' },
    { icon: 'bi bi-cloud', label: 'Cloud engineering' },
    { icon: 'bi bi-bar-chart-line', label: 'AI & data' },
    { icon: 'bi bi-boxes', label: 'Product design' },
  ];

  readonly active = signal(0);

  readonly current = computed(() => [this.slides[this.active()]]);

  readonly leftTabs = computed(() =>
    this.slides
      .map((slide, index) => ({ slide, index }))
      .filter(({ index }) => index < this.active()),
  );

  readonly rightTabs = computed(() =>
    this.slides
      .map((slide, index) => ({ slide, index }))
      .filter(({ index }) => index > this.active()),
  );

  readonly nodes: Node[] = [];
  readonly links: Link[] = [];

  constructor() {
    this.buildNetwork();
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  go(index: number): void {
    if (index === this.active()) return;

    this.direction.set(index > this.active() ? 'left' : 'right');
    this.active.set(index);
    this.restartAutoSlide();
  }

  next(): void {
    this.direction.set('left');
    this.active.update(i => (i + 1) % this.slides.length);
    this.restartAutoSlide();
  }

  prev(): void {
    this.direction.set('right');
    this.active.update(
      i => (i - 1 + this.slides.length) % this.slides.length
    );
    this.restartAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.timerStartedAt = Date.now();
    this.timerProgress.set(0);

    this.autoSlideInterval = setInterval(() => {
      this.direction.set('left');
      this.active.update(i => (i + 1) % this.slides.length);
      this.timerStartedAt = Date.now();
      this.timerProgress.set(0);
    }, this.slideDuration);

    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.timerStartedAt;
      this.timerProgress.set(
        Math.min((elapsed / this.slideDuration) * 100, 100)
      );
    }, 50);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = undefined;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  private restartAutoSlide(): void {
    this.startAutoSlide();
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  private buildNetwork(): void {
    let seed = 7;
    const rand = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

    const hubs: Node[] = [
      { x: 760, y: 300, r: 6, hub: true },
      { x: 560, y: 190, r: 4.5, hub: true },
      { x: 880, y: 150, r: 4.5, hub: true },
      { x: 640, y: 430, r: 4, hub: true },
    ];

    const scatter: Node[] = Array.from({ length: 110 }, () => ({
      x: 260 + rand() * 740,
      y: 20 + rand() * 560,
      r: 1.2 + rand() * 1.6,
      hub: false,
    }));

    this.nodes.push(...scatter, ...hubs);

    const curve = (a: Node, b: Node): string => {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const bend = 0.18;
      return `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${(mx - dy * bend).toFixed(1)},${(my + dx * bend).toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
    };

    const dist = (a: Node, b: Node) => Math.hypot(a.x - b.x, a.y - b.y);

    for (const a of scatter) {
      scatter
        .filter((b) => b !== a)
        .sort((p, q) => dist(a, p) - dist(a, q))
        .slice(0, 2)
        .forEach((b) => this.links.push({ d: curve(a, b), hub: false }));
    }

    for (const hub of hubs) {
      scatter
        .filter((n) => dist(n, hub) < 260)
        .slice(0, 22)
        .forEach((n) => this.links.push({ d: curve(hub, n), hub: true }));
    }
  }
}