import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamebookPage } from './gamebook.page';
import { GamebookRoutingModule } from './gamebook-routing.module';
import { GamebookService } from './gamebook.service';
import { EditGamebookPage } from './edit-gamebook.page';
import { ReadGamebookPage } from './read-gamebook.page';
import { EditSectionPage } from './edit-section.page';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GamebookPage,
    EditGamebookPage,
    ReadGamebookPage,
    EditSectionPage,
  ],
  imports: [
    CommonModule,
    GamebookRoutingModule,
    QuillModule,
    ReactiveFormsModule,
  ],
  providers: [GamebookService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GamebookModule {}
