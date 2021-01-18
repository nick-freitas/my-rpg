import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './user-profile.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
