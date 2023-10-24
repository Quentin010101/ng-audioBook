import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './utils/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './dashboard/nav/nav.component';
import { HomeComponent } from './dashboard/home/home.component';
import { LibraryComponent } from './dashboard/library/library.component';
import { AudioComponent } from './dashboard/audio/audio.component';
import { PlayComponent } from './utils/icon/play/play.component';
import { IconContainerComponent } from './utils/icon/icon-container/icon-container.component';
import { PlayForwardComponent } from './utils/icon/play-forward/play-forward.component';
import { PlayBackComponent } from './utils/icon/play-back/play-back.component';
import { PauseComponent } from './utils/icon/pause/pause.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    NavComponent,
    HomeComponent,
    LibraryComponent,
    AudioComponent,
    PlayComponent,
    IconContainerComponent,
    PlayForwardComponent,
    PlayBackComponent,
    PauseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
