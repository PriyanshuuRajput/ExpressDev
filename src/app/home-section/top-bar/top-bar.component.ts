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
      { label: 'Platform', href: '#services', children: [
      { label: 'Member engagement', href: '#services', icon: 'bi-people-fill', desc: 'Profile, community and connection flows' },
      { label: 'Learning experience', href: '#services', icon: 'bi-mortarboard-fill', desc: 'Courses, pathways and progress tracking' },
      { label: 'Commerce engine', href: '#services', icon: 'bi-bag-check-fill', desc: 'Subscriptions, storefronts and memberships' },
      { label: 'Cloud operations', href: '#services', icon: 'bi-cloud-fill', desc: 'Reliable hosting, scaling and monitoring' },
      { label: 'Security and trust', href: '#services', icon: 'bi-shield-lock-fill', desc: 'Access control and governance' },
      { label: 'Growth insights', href: '#services', icon: 'bi-graph-up-arrow', desc: 'Analytics for engagement and retention' }] },
      { label: 'Communities', href: '#solutions', children: [
      { label: 'Corporate communities', href: '#solutions' },
      { label: 'Member networks', href: '#solutions' },
      { label: 'Learning groups', href: '#solutions' },
      { label: 'Professional associations', href: '#solutions' }] },
      { label: 'Industries', href: '#industries', children: [
      { label: 'Healthcare', href: '#industries' },
      { label: 'Education', href: '#industries' },
      { label: 'B2B networks', href: '#industries' },
      { label: 'Professional bodies', href: '#industries' },
      { label: 'Associations', href: '#industries' }] },
      { label: 'Results', href: '#work' },
      { label: 'Why us', href: '#about' },
      { label: 'Plans', href: '#pricing' },
      { label: 'Insights', href: '#resources', children: [
      { label: 'Community guide', href: '#resources' },
      { label: 'Case studies', href: '#work' },
      { label: 'Learning roadmap', href: '#about' }] }
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