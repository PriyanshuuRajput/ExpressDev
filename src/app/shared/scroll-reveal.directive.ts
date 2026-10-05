import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: 'main[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private revealFallback?: number;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return;
    }

    const sections = this.host.nativeElement.querySelectorAll<HTMLElement>('section');
    if (!sections.length) {
      return;
    }

    this.host.nativeElement.classList.add('has-scroll-reveal');
    sections.forEach((section, index) => {
      section.classList.add('scroll-reveal');
      if (index === 0) {
        section.classList.add('is-visible');
      } else {
        section.classList.add('scroll-pending');
      }
    });

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('scroll-pending');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px'
    });

    sections.forEach((section, index) => {
      if (index > 0) {
        this.observer?.observe(section);
      }
    });

    this.revealFallback = window.setTimeout(() => {
      sections.forEach((section) => {
        section.classList.add('is-visible');
        section.classList.remove('scroll-pending');
      });
    }, 3000);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.revealFallback !== undefined) {
      window.clearTimeout(this.revealFallback);
    }
  }
}
