import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GameBook } from '../gamebook/gamebook.model';

@Component({
  selector: 'app-gamebook-card',
  templateUrl: './gamebook-card.component.html',
  styleUrls: ['./gamebook-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamebookCardComponent implements OnInit {
  @Input() gamebook: GameBook | undefined;

  constructor() {}

  ngOnInit(): void {}
}
