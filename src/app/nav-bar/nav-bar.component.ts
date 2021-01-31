import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  constructor(public userService: UserService, public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }
}
