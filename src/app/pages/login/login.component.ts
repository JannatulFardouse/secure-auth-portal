import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // Ensure this is added
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    const { username, password } = this.form.value;
  const userData = localStorage.getItem(username);

  if (!userData) {
    alert('User not found');
    return;
  }

  const user = JSON.parse(userData);

  if (user.password === btoa(password)) {
    localStorage.setItem('tempUser', username); // Store temporarily for MFA
    // Navigate to MFA step
    window.location.href = '/mfa';
  } else {
    alert('Incorrect password');
  }
}
