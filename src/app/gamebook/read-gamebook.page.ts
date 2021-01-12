import { Component, OnInit } from '@angular/core';

@Component({
  template: ` <div class="container page-container"></div> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ReadGamebookPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
