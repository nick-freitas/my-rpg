import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login-mode',
  templateUrl: './login-mode.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModeComponent implements OnInit {
  @Output() changeToRegisterMode: EventEmitter<boolean>;
  loginErrorMessage: string | undefined;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.changeToRegisterMode = new EventEmitter<boolean>();
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      persistLogin: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  forgotPassword() {}

  registerInstead() {
    this.changeToRegisterMode.emit(true);
  }

  async login() {
    const loginValues = this.loginForm.value;

    this.userService
      .login(loginValues)
      .then((_) => this.router.navigate(['/']))
      .catch((error: string) => (this.loginErrorMessage = error));
  }
}
