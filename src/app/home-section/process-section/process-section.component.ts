import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Content from '../../content';

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './process-section.component.html',
  styleUrl: './process-section.component.less',
})
export class ProcessSectionComponent {
  readonly steps = Content.STEPS;
}
