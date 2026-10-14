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
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '#about' },
        { label: 'Our services', href: '#services' },
        { label: 'Our work', href: '#work' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web development', href: '#services' },
        { label: 'UI/UX design', href: '#services' },
        { label: 'Cloud & DevOps', href: '#services' },
        { label: 'Cybersecurity', href: '#services' },
      ],
    },
  ];
}
