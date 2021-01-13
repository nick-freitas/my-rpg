import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';
import { GamebookService } from './gamebook.service';
import { Section } from './gamebook.type';

@Component({
  template: `
    <div class="container page-container">
      <div *ngIf="section$ | async as section">
        <div class="card">
          <h5 class="card-header">{{ section.name }}</h5>
          <div class="card-body">
            <quill-editor [formControl]="editorContent"> </quill-editor>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-outline-primary"
                (click)="saveSectionContent()"
              >
                Save Changes
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                (click)="revertChanges()"
              >
                Revert Changes
              </button>
            </div>
          </div>
        </div>
        <div id="qe-container"></div>
        <div class="card progression-container">
          <h5 class="card-header">Progression</h5>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" *ngIf="!section.progressions.length">
                This currently has no option.
              </li>
              <li
                class="list-group-item"
                *ngFor="let prog of section.progressions"
                [routerLink]="['..', prog.id]"
              >
                {{ prog.descriptor }}
              </li>
            </ul>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-primary"
                (click)="createNewProgression()"
              >
                Add a new progression option
              </button>
              <div ngbDropdown class="d-inline-block">
                <button
                  class="btn btn-primary"
                  id="dropdownBasic1"
                  ngbDropdownToggle
                >
                  Add existing section
                </button>
                <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
                  <button
                    ngbDropdownItem
                    *ngFor="let prog of possibleProgressions$ | async"
                    (click)="addProgression(prog.id)"
                  >
                    {{ prog.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      #qe-container,
      .progression-container,
      .btn-group {
        margin-top: 1rem;
      }
    `,
  ],
})
export class EditSectionPage implements OnInit {
  section$: Observable<Section>;
  gamebookId!: number;
  sectionID!: string;
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
    this.section$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.gamebookId = Number(params.get('gamebookId'));
        this.sectionID = String(params.get('sectionId'));

        this.possibleProgressions$ = this.gamebookService.getPossibleProgressions(
          this.gamebookId,
          this.sectionID
        );

        return this.gamebookService.getSectionById(
          this.gamebookId,
          this.sectionID
        );
      }),
      tap((s) => {
        this.previousContent = s.content;
        this.editorContent.setValue(s.content);
      })
    );
  }

  revertChanges(): void {
    this.editorContent.setValue(this.previousContent);
  }

  saveSectionContent(): void {
    this.gamebookService.saveSectionContent(
      this.gamebookId,
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
    const newId = this.gamebookService.createNewProgression(
      this.gamebookId,
      this.sectionID
    );

    this.router.navigate(['/gamebook', this.gamebookId, 'edit', newId]);
  }

  addProgression(progressionId: string) {
    this.gamebookService.addProgression(
      this.gamebookId,
      this.sectionID,
      progressionId
    );

    this.possibleProgressions$ = this.gamebookService.getPossibleProgressions(
      this.gamebookId,
      this.sectionID
    );
  }
}
