import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
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
    canActivate: [AuthGuard],
  },
  {
    path: ':gamebookId/edit/:sectionId',
    component: EditSectionPage,
    canActivate: [AuthGuard],
  },
  {
    path: ':gamebookId/read',
    component: ReadGamebookPage,
    canActivate: [AuthGuard],
  },
  {
    path: ':gamebookId/read/:sectionId',
    component: ReadGamebookPage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamebookRoutingModule {}
