import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<object> = new EventEmitter();
  loginForm!: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService
  ) {}

  onClick() {
    this.toggleFlag.emit();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  // }
  handleLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const username = document.querySelector('.username') as HTMLInputElement;
    const password = document.querySelector('.password') as HTMLInputElement;

    this.participantService.name = username.value;

    if (username.value === '' || password.value === '') {
      return;
    }
    const lsValue = localStorage.getItem(username.value);

    if (lsValue !== null) {
      if (lsValue == password.value) {
        sessionStorage.setItem('username', username.value);
        this.router.navigate(['admin-dashboard']);
      } else {
        alert('Wrong data');
      }
    } else {
      alert('Wrong data');
    }
  }
}
