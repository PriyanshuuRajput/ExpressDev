import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import * as Content from '../../content';

@Component({
  selector: 'app-work-section',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: './work-section.component.html',
  styleUrl: './work-section.component.less',
})
export class WorkSectionComponent {
  readonly projects = Content.WORK;
}
