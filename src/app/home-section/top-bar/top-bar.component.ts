import { Component, ElementRef, HostListener, ViewEncapsulation, ViewChild, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';

interface Child { label: string; href: string; icon?: string; desc?: string }
interface NavItem { label: string; href: string; children?: Child[] }

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatExpansionModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.less',
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent {
  private readonly scrollEnterThreshold = 96;
  private readonly scrollExitThreshold = 8;

  menuOpen = signal(false);
  scrolled = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');
  searchMessage = signal('');
  hoveredNavItem = signal('');
  openNavItem = signal('');

  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  nav: NavItem[] = [
      { label: 'Home', href: '#top' },
      { label: 'Services', href: '#services', children: [
      { label: 'Custom software', href: '#services', icon: 'bi-code-slash', desc: 'Apps and APIs built for your workflow' },
      { label: 'Web development', href: '#services', icon: 'bi-globe2', desc: 'Fast sites, portals and e-commerce' },
      { label: 'Mobile apps', href: '#services', icon: 'bi-phone', desc: 'iOS and Android, native or hybrid' },
      { label: 'Cloud and DevOps', href: '#services', icon: 'bi-cloud', desc: 'AWS, Azure, CI/CD and monitoring' },
      { label: 'Cybersecurity', href: '#services', icon: 'bi-shield-lock', desc: 'Audits, testing and compliance' },
      { label: 'AI and data', href: '#services', icon: 'bi-cpu', desc: 'Automation, analytics and ML' }] },
      { label: 'Solutions', href: '#solutions', children: [
      { label: 'Digital transformation', href: '#solutions' },
      { label: 'Product engineering', href: '#solutions' },
      { label: 'IT outsourcing', href: '#solutions' },
      { label: 'Dedicated teams', href: '#solutions' }] },
      { label: 'Industries', href: '#industries', children: [
      { label: 'Healthcare', href: '#industries' },
      { label: 'Fintech', href: '#industries' },
      { label: 'Retail', href: '#industries' },
      { label: 'Logistics', href: '#industries' },
      { label: 'Education', href: '#industries' }] },
      { label: 'Our work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Resources', href: '#resources', children: [
      { label: 'Blog', href: '#resources' },
      { label: 'Case studies', href: '#work' },
      { label: 'Careers', href: '#about' }] }
  ];

  openSearch() {
    this.searchOpen.set(true);
    this.searchMessage.set('');
    setTimeout(() => this.searchInput?.nativeElement.focus());
  }

  closeSearch() {
    this.searchOpen.set(false);
    this.searchQuery.set('');
    this.searchMessage.set('');
  }

  onSearchInput(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.searchQuery.set(input.value);
      this.searchMessage.set('');
    }
  }

  submitSearch() {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    if (!query) {
      this.searchMessage.set('Enter a search term.');
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id], section[id]'));
    const match = sections.find((section) => section.innerText.toLocaleLowerCase().includes(query));

    if (!match) {
      this.searchMessage.set('No matching section found.');
      return;
    }

    match.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.closeSearch();
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    const isScrolled = this.scrolled()
      ? scrollY > this.scrollExitThreshold
      : scrollY > this.scrollEnterThreshold;

    if (this.scrolled() !== isScrolled) {
      this.scrolled.set(isScrolled);
    }
  }
}