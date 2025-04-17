import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup

  contactInfo = [
    {
      icon: "icon-mail",
      title: "Email",
      value: "contact@example.com",
    },
    {
      icon: "icon-phone",
      title: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: "icon-map",
      title: "Location",
      value: "San Francisco, CA",
    },
  ]

  officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "By appointment" },
    { day: "Sunday", hours: "Closed" },
  ]

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Form submitted:", this.contactForm.value)
      // Aquí iría la lógica para enviar el formulario
      this.contactForm.reset()
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key)
        control?.markAsTouched()
      })
    }
  }
}
