import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  templateUrl: './user-profile.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  uid: string | undefined;
  name: FormControl;
  subscriptions: Subscription[];

  constructor(public userService: UserService) {
    this.subscriptions = [];
    this.name = new FormControl('');
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.name.setValue(user?.displayName);
      this.uid = user?.id;
      console.log(user);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  saveProfile(): void {
    if (!this.uid) {
      return;
    }

    this.userService
      .updateDisplayName(this.uid, this.name.value)
      .then((_) => console.log('here'))
      .catch((error) => console.error(error));
  }
}
