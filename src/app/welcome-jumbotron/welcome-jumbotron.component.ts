import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-welcome-jumbotron',
  templateUrl: './welcome-jumbotron.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeJumbotronComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
