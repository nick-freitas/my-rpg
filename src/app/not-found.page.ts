import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <div class="container page-container">
      <div class="card d-flex align-items-center">
        <h1>404</h1>
        <h3>The page you requested could not be found</h3>
        <h5>Go back to <a routerLink="/">home</a></h5>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
