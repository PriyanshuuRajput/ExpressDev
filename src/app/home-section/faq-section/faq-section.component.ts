import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import * as Content from '../../content';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.less',
})
export class FaqSectionComponent {
  readonly questions = Content.FAQ;
}
