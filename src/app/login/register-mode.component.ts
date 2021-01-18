import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register-mode',
  templateUrl: './register-mode.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterModeComponent implements OnInit {
  @Output() changeToLoginMode: EventEmitter<boolean>;
  registerErrorMessage: string | undefined;
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.changeToLoginMode = new EventEmitter<boolean>();
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      persistLogin: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  registerInstead() {
    this.changeToLoginMode.emit(true);
  }

  async register() {
    const registerValues = this.registerForm.value;

    this.userService
      .register(registerValues)
      .then((_) => this.router.navigate(['/']))
      .catch((error: string) => (this.registerErrorMessage = error));
  }
}
