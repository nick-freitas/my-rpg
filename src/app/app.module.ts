import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LearnMorePage } from './learn-more/learn-more.page';
import { NotFoundPage } from './not-found.page';
import { HomePage } from './home.page';
import { WelcomeJumbotronComponent } from './welcome-jumbotron/welcome-jumbotron.component';
import { HomeStoreComponent } from './home-store/home-store.component';
import { LibraryPage } from './library.page';
import { GamebookModule } from './gamebook/gamebook.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LearnMorePage,
    NotFoundPage,
    HomePage,
    WelcomeJumbotronComponent,
    HomeStoreComponent,
    LibraryPage,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamebookModule,
    NgbModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
