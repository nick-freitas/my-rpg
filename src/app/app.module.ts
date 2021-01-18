import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LearnMorePage } from './learn-more/learn-more.page';
import { NotFoundPage } from './not-found.page';
import { HomePage } from './home.page';
import { WelcomeJumbotronComponent } from './welcome-jumbotron/welcome-jumbotron.component';
import { HomeStoreComponent } from './home-store/home-store.component';
import { LibraryPage } from './library/library.page';
import { GamebookModule } from './gamebook/gamebook.module';
import { ToastComponent } from './toast/toast.component';
import { FeaturedStoriesComponent } from './featured-stories/featured-stories.component';
import { PublishedBooksPage } from './published-books/published-books.page';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromUser from './user/user.reducer';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { LoginPage } from './login/login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModeComponent } from './login/login-mode.component';
import { LogoutPage } from './logout.page';
import { RegisterModeComponent } from './login/register-mode.component';
import { UserProfileComponent } from './user/user-profile.component';

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
    FeaturedStoriesComponent,
    PublishedBooksPage,
    FooterComponent,
    LoginPage,
    LoginModeComponent,
    LogoutPage,
    RegisterModeComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamebookModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    StoreModule.forRoot({
      user: fromUser.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
