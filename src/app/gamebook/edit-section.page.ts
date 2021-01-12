import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from '../toast.service';
import { GamebookService } from './gamebook.service';
import { GameBook, Section } from './gamebook.type';

@Component({
  template: `
    <div class="container page-container">
      <div *ngIf="section$ | async as section">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
              <span>{{ section.name }}</span>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="saveSectionContent()"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="revertChanges()"
                >
                  Revert Changes
                </button>
              </div>
            </h5>
          </div>
        </div>
        <div id="qe-container">
          <quill-editor [formControl]="editorContent"> </quill-editor>
        </div>
      </div>

      <!-- <quill-view [content]="editorContent.value"></quill-view> -->
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      #qe-container {
        margin-top: 1rem;
      }
    `,
  ],
})
export class EditSectionPage implements OnInit {
  //[formControl]="editorContent"
  section$: Observable<Section>;
  gamebookId!: number;
  sectionID!: string;
  previousContent!: string;
  editorContent = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private gamebookService: GamebookService,
    public toastService: ToastService
  ) {
    this.section$ = new Observable<Section>();
  }

  ngOnInit(): void {
    this.section$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.gamebookId = Number(params.get('gamebookId'));
        this.sectionID = String(params.get('sectionId'));
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
}
