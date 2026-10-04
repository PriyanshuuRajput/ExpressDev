import { Component } from '@angular/core';
import * as Content from '../../content';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  templateUrl: './stats-section.component.html',
  styleUrl: './stats-section.component.less',
})
export class StatsSectionComponent {
  readonly stats = Content.STATS;
}
