import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as speakeasy from 'speakeasy';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const { username, password, token } = this.form.value;

      const storedUser = localStorage.getItem(username);
      if (storedUser) {
        const user = JSON.parse(storedUser);

        const isPasswordCorrect = user.password === btoa(password);

        // Verify TOTP token with speakeasy
        const isTokenValid = speakeasy.totp.verify({
          secret: user.secret,
          encoding: 'base32',
          token
        });

        if (isPasswordCorrect && isTokenValid) {
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials or MFA token.');
        }
      } else {
        alert('User not found.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  }
}
