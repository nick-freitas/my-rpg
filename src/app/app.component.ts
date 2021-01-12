import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
    <app-toasts></app-toasts>
  `,
  styles: [``],
})
export class AppComponent {
  constructor() {}
}
