import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Output() toggleFlag: EventEmitter<object> = new EventEmitter();
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}
  onClick() {
    this.toggleFlag.emit();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  signUpHandler(form) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (form.value.password === form.value.confirmPassword) {
      localStorage.setItem(form.value.email, form.value.password);
      Swal.fire('Success');
    } else {
      Swal.fire('Wrong inputs');
    }
  }
}
