import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { LearnMorePage } from './learn-more/learn-more.page';
import { LibraryPage } from './library/library.page';
import { NotFoundPage } from './not-found.page';
import { PublishedBooksPage as PublishedBooksPage } from './published-books/published-books.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full',
  },
  {
    path: 'learn-more',
    component: LearnMorePage,
  },
  {
    path: 'library',
    component: LibraryPage,
  },
  {
    path: 'published-books',
    component: PublishedBooksPage,
  },
  {
    path: 'gamebook',
    loadChildren: () =>
      import('./gamebook/gamebook.module').then((m) => m.GamebookModule),
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
