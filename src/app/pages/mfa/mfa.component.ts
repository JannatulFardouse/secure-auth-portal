import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { authenticator } from 'otplib';

@Component({
  selector: 'app-mfa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      token: ['', Validators.required]
    });
  }

  verify() {
    const username = localStorage.getItem('tempUser');
    const userData = localStorage.getItem(username!);
    if (!userData) return;

    const user = JSON.parse(userData);
    const isValid = authenticator.check(this.form.value.token, user.secret);

    if (isValid) {
      localStorage.setItem('authToken', username!);
      alert('Authentication successful');
      window.location.href = '/dashboard';
    } else {
      alert('Invalid token');
    }
  }
}
