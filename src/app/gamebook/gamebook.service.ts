// https://medium.com/@usman_qb/angular-11-state-management-with-ngrx-side-effects-1d37830fbd64
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { GameBook as Gamebook, Progression, Section } from './gamebook.model';

@Injectable()
export class GamebookService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  private dbGamebookToModuleGamebook(gamebook: any): Gamebook {
    return { ...gamebook, published: gamebook?.published?.toDate() };
  }

  // by id doesnt work
  getGamebooks({ id, idList, limit, featured }: any): Observable<Gamebook[]> {
    return this.firestore
      .collection<Gamebook>('gamebooks', (ref) => {
        let query: any = ref;

        if (id) {
          query = query.where('id', '==', id);
          limit = limit || 1;
        }

        if (idList) {
          console.log('idlist', idList);
          query = query.where('id', 'in', idList);
        }

        if (featured) {
          query = query.where('featured', '==', featured);
        }

        if (limit) {
          query = query.limit(limit);
        }

        return query;
      })
      .valueChanges()
      .pipe(
        switchMap((gamebooks) => {
          const _authorIds = new Set();
          gamebooks.forEach((gb) => _authorIds.add(gb?.author));
          const authorIds = Array.from(_authorIds).filter((x) => x);
          return combineLatest([
            of(gamebooks),
            combineLatest(
              authorIds.map((authorId) =>
                this.firestore.doc<User>(`users/${authorId}`).valueChanges()
              )
            ),
            combineLatest([this.userService.user$]),
          ]);
        }),
        map(([gamebooks, authors, user]) =>
          gamebooks.map((gb) => ({
            ...gb,
            _author: authors.find((u) => u?.id === gb?.author),
            publishedByUser: user && user[0]?.published?.includes(gb.id),
            ownedByUser: user && user[0]?.library?.includes(gb.id),
          }))
        ),
        map((gb) => gb.map(this.dbGamebookToModuleGamebook))
      );
  }

  getGamebookById(id: string): Observable<Gamebook> {
    return this.getGamebooks({ id }).pipe(map((x) => x[0]));
  }

  getFeaturedAdventures() {
    return this.getGamebooks({ featured: true });
  }

  getHomepageAdventures() {
    return this.getGamebooks({});
  }

  getPublishedAdventures(): Observable<Gamebook[]> {
    return this.userService.user$.pipe(
      switchMap((user) => this.getGamebooks({ idList: user?.published || [] }))
    );
  }

  getLibrary(): Observable<Gamebook[] | undefined> {
    return this.userService.user$.pipe(
      switchMap((user) => this.getGamebooks({ idList: user?.library || [] }))
    );
  }

  getStartingPointSection(gamebookId: string): Observable<Section | undefined> {
    return this.getSection({ startingPoint: true, gamebookId });
  }

  getSectionById(sectionId: string): Observable<Section | undefined> {
    return this.getSection({ id: sectionId });
  }

  getSection({
    id,
    gamebookId,
    startingPoint,
  }: any): Observable<Section | undefined> {
    console.log(id, gamebookId, startingPoint);
    return this.firestore
      .collection<Section>('sections', (ref) => {
        let query: any = ref;
        query = query.limit(1);

        if (startingPoint) {
          query = query
            .where('isStartingPoint', '==', true)
            .where('gamebookId', '==', gamebookId);
        }

        if (id) {
          query = query.where('id', '==', id);
        }

        return query;
      })
      .valueChanges()
      .pipe(
        mergeAll(),
        tap((x) => console.log('y', x)),
        switchMap((section) => {
          if (!section.progressions || !section.progressions.length) {
            return combineLatest([of(section), of([])]);
          }

          return combineLatest([
            of(section),
            combineLatest(
              section.progressions.map((pid) =>
                this.firestore
                  .doc<Progression>(`progressions/${pid}`)
                  .valueChanges()
              )
            ),
          ]);
        }),
        map(
          ([section, progressions]) =>
            <Section>{
              ...section,
              _progressions: progressions,
            }
        ),
        tap((x) => console.log('x', x))
      );
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
