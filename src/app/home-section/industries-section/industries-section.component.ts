import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import * as Content from '../../content';

@Component({
  selector: 'app-industries-section',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './industries-section.component.html',
  styleUrl: './industries-section.component.less',
})
export class IndustriesSectionComponent {
  readonly industries = Content.INDUSTRIES;
}
