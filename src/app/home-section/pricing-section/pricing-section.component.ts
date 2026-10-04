import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as Content from '../../content';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './pricing-section.component.html',
  styleUrl: './pricing-section.component.less',
})
export class PricingSectionComponent {
  readonly plans = Content.PLANS;
}
