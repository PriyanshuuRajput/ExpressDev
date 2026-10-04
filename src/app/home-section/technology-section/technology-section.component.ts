import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import * as Content from '../../content';

@Component({
  selector: 'app-technology-section',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './technology-section.component.html',
  styleUrl: './technology-section.component.less',
})
export class TechnologySectionComponent {
  readonly groups = Object.entries(Content.STACK);
}
