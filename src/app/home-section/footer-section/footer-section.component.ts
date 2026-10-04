import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.less',
})
export class FooterSectionComponent {
  readonly year = new Date().getFullYear();
  readonly columns = [
    { title: 'Services', links: ['Software', 'Web development', 'Cloud & DevOps', 'Cybersecurity'] },
    { title: 'Company', links: ['About', 'Careers', 'Blog', 'Privacy policy'] },
  ];
}
