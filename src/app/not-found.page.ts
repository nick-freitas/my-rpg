import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <div class="container page-container">
      <div class="card d-flex align-items-center">
        <h1 i18n>404</h1>
        <h3 i18n>The page you requested could not be found</h3>
        <h5 i18n>Go back to <a routerLink="/">home</a></h5>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
