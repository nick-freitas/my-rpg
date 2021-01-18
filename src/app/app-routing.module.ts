import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePage } from './home.page';
import { LearnMorePage } from './learn-more/learn-more.page';
import { LibraryPage } from './library/library.page';
import { LoginPage } from './login/login.page';
import { LogoutPage } from './logout.page';
import { NotFoundPage } from './not-found.page';
import { PublishedBooksPage as PublishedBooksPage } from './published-books/published-books.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'logout',
    component: LogoutPage,
  },
  {
    path: 'learn-more',
    component: LearnMorePage,
  },
  {
    path: 'library',
    component: LibraryPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'published-books',
    component: PublishedBooksPage,
    canActivate: [AuthGuard],
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
