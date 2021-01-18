//https://medium.com/@usman_qb/angular-11-state-management-with-ngrx-side-effects-1d37830fbd64

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, from, iif, merge, Observable, of, timer } from 'rxjs';
import { map, mergeAll, switchMap } from 'rxjs/operators';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { GameBook, Section } from './gamebook.model';

@Injectable()
export class GamebookService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  private dbGamebookToModuleGamebook(gamebook: any): GameBook {
    return { ...gamebook, published: gamebook?.published?.toDate() };
  }

  getGamebooks({ id, idList, limit, featured }: any): Observable<GameBook[]> {
    return this.firestore
      .collection<GameBook>('gamebooks', (ref) => {
        let query = ref;

        if (id) {
          query.where('__name__', '==', id);
        }

        if (limit) {
          query.limit(limit);
        }

        if (featured) {
          query.where('featured', '==', featured);
        }

        if (idList) {
          query.where('__name__', '==', idList);
        }

        return query;
      })
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((gamebooks) => {
          const _authorIds = new Set();
          gamebooks.forEach((gb) => _authorIds.add(gb?.author?.id));
          const authorIds = Array.from(_authorIds).filter((x) => x);

          return combineLatest(
            of(gamebooks),
            combineLatest(
              authorIds.map((authorId) =>
                this.firestore
                  .collection<User>('users', (ref) =>
                    ref.where('__name__', '==', authorId)
                  )
                  .valueChanges()
                  .pipe(map((users) => users[0]))
              )
            )
          );
        }),
        map(([gamebooks, authors]) =>
          gamebooks.map((gb) => ({
            ...gb,
            _author: authors.find((u) => u.id === gb?.author?.id),
          }))
        ),
        map((gb) => gb.map(this.dbGamebookToModuleGamebook))
      );
  }

  getGamebookById(id: number) {
    return this.getGamebooks({ id });
  }

  getFeaturedAdventures() {
    return this.getGamebooks({ featured: true });
  }

  getPublishedAdventures(): Observable<GameBook[]> {
    return this.userService.user$.pipe(
      switchMap((user) =>
        this.getGamebooks(user?.published?.map((gbRef) => gbRef.id))
      )
    );
  }

  getLibrary(): Observable<GameBook[] | undefined> {
    return this.userService.user$.pipe(
      switchMap((user) =>
        this.getGamebooks(user?.library?.map((gbRef) => gbRef.id))
      )
    );
  }

  getStartingPointSection(gamebookId: string): Observable<Section | undefined> {
    return this.firestore
      .collection<Section>(`sections/`, (ref) =>
        ref
          .where('gamebookId', '==', gamebookId)
          .where('isStartingPoint', '==', true)
          .limit(1)
      )
      .valueChanges({ idField: 'id' })
      .pipe(mergeAll());
  }

  getSectionById(sectionId: string): Observable<Section | undefined> {
    return this.firestore
      .doc<Section>(`sections/${sectionId}`)
      .valueChanges({ idField: 'id' });
  }

  getPossibleProgressions(
    gamebookId: number,
    sectionId: number //Observable<Section[]> {
  ) {
    // const currentProgressions = this.findSection(gamebookId, sectionId)
    //   .progressions;
    // let sections = this.gamebooks.find((gb: GameBook) => gb.id === gamebookId)
    //   ?.sections!;
    // sections = sections.filter((s) => s.id !== sectionId);
    // sections = sections.filter(
    //   (s) => !currentProgressions.find((p) => p.id === s.id)
    // );
    // return of(sections);
  }

  addProgression(sectionId: string, progressionId: string): void {
    // this.gamebooks = this.gamebooks.map((gb) => {
    //   if (gb.id === gamebookId) {
    //     gb.sections = gb.sections.map((s) => {
    //       if (s.id === sectionId) {
    //         const newProg = this.findSection(gamebookId, progressionId);
    //         s.progressions.push({ id: newProg.id, descriptor: newProg.name });
    //       }
    //       return s;
    //     });
    //   }
    //   return gb;
    // });
    // console.log('a');
    // this.saveStateToLocalStorage();
  }

  saveSectionContent(sectionId: string, content: string) {
    this.firestore.doc(`sections/${sectionId}`).update({ content: content });
  }

  setSectionAsStartingPoint(sectionId: string) {
    // this.firestore
    //   .collection(`sections`, (ref) =>
    //     ref
    //       .where('gamebookId', '==', gamebookId)
    //       .where('isStartingPoint', '==', true)
    //   )
    //   .update();
  }

  createNewProgression(sectionId: string) {
    // const nextID =
    //   (devProgressions.reduce((a, b) => (a > b.id ? a : b.id), -1) || 0) + 1;
    // this.gamebooks = this.gamebooks.map((gb) => {
    //   if (gb.id === gamebookId) {
    //     const newSection: Section = {
    //       id: newId,
    //       content: '',
    //       name: 'New Section',
    //       isStartingPoint: false,
    //       progressions: [],
    //     };
    //     gb.sections.push(newSection);
    //     gb.sections = gb.sections.map((s) => {
    //       if (s.id === sectionId) {
    //         s.progressions.push({
    //           id: newSection.id,
    //           descriptor: newSection.name,
    //         });
    //       }
    //       return s;
    //     });
    //   }
    //   return gb;
    // });
    // this.saveStateToLocalStorage();
    // return newId;
  }
}
