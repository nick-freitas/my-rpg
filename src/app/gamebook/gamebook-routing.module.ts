import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditGamebookPage } from './edit-gamebook.page';
import { EditSectionPage } from './edit-section.page';
import { GamebookPage } from './gamebook.page';
import { ReadGamebookPage } from './read-gamebook.page';

const routes: Routes = [
  {
    path: ':gamebookId',
    component: GamebookPage,
  },
  {
    path: ':gamebookId/edit',
    component: EditGamebookPage,
  },
  {
    path: ':gamebookId/edit/:sectionId',
    component: EditSectionPage,
  },
  {
    path: ':gamebookId/read',
    component: ReadGamebookPage,
  },
  {
    path: ':gamebookId/read/:sectionId',
    component: ReadGamebookPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamebookRoutingModule {}
