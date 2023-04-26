import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<object> = new EventEmitter();
  loginForm!: FormGroup;
  submitted = false;
  profile: object;
  isAdmin: boolean;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    public profileService: ProfileService
  ) {}

  onClick() {
    this.toggleFlag.emit();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  async handleLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const email = document.querySelector('.email') as HTMLInputElement;
    const password = document.querySelector('.password') as HTMLInputElement;

    const emailVal = localStorage.getItem(email.value);
    if (emailVal !== null) {
      if (emailVal == password.value) {
        await this.profileService
          .getProfileByEmail(email.value)
          .then((e) => (this.profile = e.data));

        this.isAdmin = this.profile['admin'];
        sessionStorage.setItem('username', this.profile['name']);
        sessionStorage.setItem('email', this.profile['email']);
        sessionStorage.setItem('admin', this.profile['admin']);
        if (this.isAdmin) {
          this.router.navigate(['admin-dashboard']);
        } else {
          this.router.navigate(['user-dashboard']);
        }
      } else {
        alert('Wrong data');
      }
    } else {
      alert('Wrong data');
    }
  }
}
