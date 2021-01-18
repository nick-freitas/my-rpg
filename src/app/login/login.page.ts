import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './login.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  mode: string;

  registerErrorMessage: string | undefined;
  registerForm: FormGroup;

  constructor(public userService: UserService, private router: Router) {
    this.mode = 'LOGIN';

    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      persistLogin: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  registerInstead($event: boolean): void {
    console.log('aaa');
    if ($event) {
      this.mode = 'REGISTER';
    }
  }

  loginInstead($event: boolean): void {
    if ($event) {
      this.mode = 'LOGIN';
    }
  }

  forgotPassword() {
    this.mode = 'RESET_PASSWORD';
  }

  sendResetLink() {
    //todo
  }

  register() {
    const registerValues = this.registerForm.value;

    this.userService
      .login(registerValues)
      .then((_) => this.router.navigate(['/']))
      .catch((error: string) => (this.registerErrorMessage = error));
  }
}
