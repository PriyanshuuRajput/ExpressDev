import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Plan { n: string; d: string; p: string; u: string; time: string; icon: string; timeIcon: string; f: string[]; hot?: boolean }

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './pricing-section.component.html',
  styleUrl: './pricing-section.component.less',
  encapsulation: ViewEncapsulation.None
})
export class PricingSectionComponent {
  plans: Plan[] = [
    { n: 'Starter', d: 'For launching a professional website.', p: '$2,500', u: 'one-time', time: '3 to 5 weeks', icon: 'bi-rocket-takeoff', timeIcon: 'bi-clock',
      f: ['Up to 8 pages', 'Responsive design', 'Basic SEO setup', 'Contact form', '30 days support'] },
    { n: 'Growth', d: 'For custom web apps and mobile products.', p: '$12,000', u: 'starting from', time: '3 to 6 months', icon: 'bi-code-square', timeIcon: 'bi-clock', hot: true,
      f: ['Discovery and UX design', 'Custom development', 'Admin dashboard', 'Cloud deployment', '90 days support'] },
    { n: 'Enterprise', d: 'For dedicated teams and managed IT.', p: 'Custom', u: 'monthly retainer', time: 'Ongoing', icon: 'bi-buildings', timeIcon: 'bi-arrow-repeat',
      f: ['Dedicated engineers', '24/7 support and SLA', 'Security and compliance', 'DevOps and monitoring', 'Quarterly roadmap'] }
  ];
  assurance = [
    { icon: 'bi-shield-check', text: 'Fixed-scope quotes' },
    { icon: 'bi-code-slash', text: 'You own the source code' },
    { icon: 'bi-headset', text: 'Support after launch' }
  ];

}