import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.less',
})
export class ContactSectionComponent {
  sent = false;

  model = {
    name: '',
    email: '',
    service: '',
    details: '',
    budget: '',
    timeline: '',
  };

  readonly services = [
    { value: 'software-development', label: 'Software Development' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile App Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'cloud-devops', label: 'Cloud & DevOps' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'it-consulting', label: 'IT Consulting' },
    { value: 'other', label: 'Other' },
  ];

  submit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // Connect your backend/API here to deliver the project inquiry.
    // Only set sent = true after the API confirms successful submission.
    console.log('Project inquiry:', { ...this.model });
  }

  resetForm(): void {
    this.sent = false;
    this.model = {
      name: '',
      email: '',
      service: '',
      details: '',
      budget: '',
      timeline: '',
    };
  }
}