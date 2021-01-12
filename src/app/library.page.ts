import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <div class="container page-container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Library</h5>
          <p class="card-text"></p>
        </div>
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
export class LibraryPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
