import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Component({
  template: `
    <div class="container page-container">
      <div class="card d-flex align-items-center">
        <h1 i18n>Logging out...</h1>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LogoutPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.logout().then((_) => this.router.navigate(['/']));
  }
}
