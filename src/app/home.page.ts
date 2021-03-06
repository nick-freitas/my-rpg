import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <app-featured-stories></app-featured-stories>

    <div class="container page-container">
      <app-welcome-jumbotron></app-welcome-jumbotron>
      <app-home-store></app-home-store>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
