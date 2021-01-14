import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
    <app-toasts></app-toasts>
    <app-footer class="mt-auto"></app-footer>
  `,
  styles: [``],
})
export class AppComponent {
  constructor() {}
}
