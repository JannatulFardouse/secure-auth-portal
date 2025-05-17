import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import * as speakeasy from 'speakeasy';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  qrCodeDataUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  async submit() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;

      // Generate secret using speakeasy
      const secret = speakeasy.generateSecret({
        name: `SecureApp (${email})`
      });

      // Generate QR code from otpauth URL
      this.qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);

      // Store user data including secret in base32 format
      const user = {
        email,
        password: btoa(password),
        secret: secret.base32
      };

      localStorage.setItem(username, JSON.stringify(user));

      alert('Registration successful! Scan the QR code using your Authenticator app.');
    }
  }
}
