import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GamebookService } from '../gamebook/gamebook.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  constructor(private gamebookService: GamebookService) {}

  ngOnInit(): void {}

  clearLocalStorage() {
    this.gamebookService.clearLocalStorage();
  }
}
