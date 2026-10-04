import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import * as Content from '../../content';

type ServiceCategory = 'All' | 'Build' | 'Run' | 'Secure' | 'Advise';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.less',
})
export class ServicesSectionComponent {
  readonly categories: ServiceCategory[] = ['All', 'Build', 'Run', 'Secure', 'Advise'];
  readonly selectedCategory = signal<ServiceCategory>('All');
  readonly services = computed(() => {
    const category = this.selectedCategory();
    return Content.SERVICES.filter((service) => category === 'All' || service.c === category);
  });

  selectCategory(category: ServiceCategory): void {
    this.selectedCategory.set(category);
  }
}
