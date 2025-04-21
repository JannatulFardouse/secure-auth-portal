import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import this

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // Add this
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Registration form submitted:', this.form.value);
    } else {
      console.log('Registration form is not valid');
    }
  }
}
