import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';
import { GamebookService } from './gamebook.service';
import { Section } from './gamebook.model';

@Component({
  templateUrl: './edit-section.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class EditSectionPage implements OnInit {
  section$: Observable<Section>;
  gamebookId: string | undefined;
  sectionID: string | undefined;
  previousContent!: string;
  editorContent = new FormControl('');
  possibleProgressions$: Observable<Section[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamebookService: GamebookService,
    public toastService: ToastService
  ) {
    this.section$ = new Observable<Section>();
    this.possibleProgressions$ = new Observable<Section[]>();
  }

  ngOnInit(): void {
    // this.section$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     this.gamebookId = Number(params.get('gamebookId'));
    //     this.sectionID = String(params.get('sectionId'));
    //     this.possibleProgressions$ = this.gamebookService.getPossibleProgressions(
    //       this.gamebookId,
    //       this.sectionID
    //     );
    //     return this.gamebookService.getSectionById(
    //       this.gamebookId,
    //       this.sectionID
    //     );
    //   }),
    //   tap((s) => {
    //     // this.previousContent = s.content;
    //     // this.editorContent.setValue(s.content);
    //   })
    // );
  }

  revertChanges(): void {
    this.editorContent.setValue(this.previousContent);
  }

  saveSectionContent(): void {
    if (!this.sectionID) return;
    this.gamebookService.saveSectionContent(
      this.sectionID,
      this.editorContent.value
    );

    this.previousContent = this.editorContent.value;
    this.toastService.show('Saved', {
      delay: 1000,
      autohide: true,
    });
  }

  createNewProgression() {
    if (!this.sectionID) return;
    const newId = this.gamebookService.createNewProgression(this.sectionID);

    this.router.navigate(['/gamebook', this.gamebookId, 'edit', newId]);
  }

  addProgression(progressionId: string) {
    if (!this.sectionID) return;
    this.gamebookService.addProgression(this.sectionID, progressionId);

    // this.possibleProgressions$ = this.gamebookService.getPossibleProgressions(
    //   this.gamebookId,
    //   this.sectionID
    // );
  }
}
