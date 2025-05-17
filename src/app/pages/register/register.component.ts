import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import {authenticator} from 'otplib';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], 
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
     const { username, email, password } = this.form.value;

    const secret = authenticator.generateSecret(); // Generate a secret for MFA
    const user = {
      email,
      password: btoa(password),  // Encode password for basic security
      secret                     // Save MFA secret
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Registration successful');
  }
}
