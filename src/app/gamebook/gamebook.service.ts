import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GAMEBOOK } from './gamebook.data';
import { GameBook, Section } from './gamebook.type';

@Injectable()
export class GamebookService {
  gamebooks: GameBook[];

  constructor() {
    this.gamebooks = [];

    this.loadStateFromLocalStorage();
  }

  saveStateToLocalStorage() {
    localStorage.setItem('mrpg-gamebooks', JSON.stringify(this.gamebooks));
  }

  loadStateFromLocalStorage() {
    const gb = localStorage.getItem('mrpg-gamebooks');
    if (gb) {
      this.gamebooks = JSON.parse(gb);
    } else {
      console.warn('THERE IS NO GAME BOOK TO LOAD');
      this.gamebooks = GAMEBOOK;
      this.saveStateToLocalStorage();
    }
  }

  getGamebooks(): Observable<GameBook[]> {
    return of(this.gamebooks);
  }

  getGamebookById(_id: number): Observable<GameBook> {
    // todo: look into Non-Null Asserion Operator
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
    // It tells TypeScript that even though something looks like it could be null,
    // ""it can trust you that it's not"" -- HA!
    return of(this.gamebooks.find((gb: GameBook) => gb.id === _id)!);
  }

  getSectionById(gamebookID: number, sectionId: string): Observable<Section> {
    return of(
      this.gamebooks
        .find((gb: GameBook) => gb.id === gamebookID)
        ?.sections.find((s) => s.id === sectionId)!
    );
  }

  saveSectionContent(gamebookID: number, sectionId: string, content: string) {
    this.gamebooks = this.gamebooks.map((gb) => {
      if (gb.id === gamebookID) {
        gb.sections = gb.sections.map((s) => {
          if (s.id === sectionId) {
            s.content = content;
          }

          return s;
        });
      }

      return gb;
    });

    this.saveStateToLocalStorage();
  }
}
