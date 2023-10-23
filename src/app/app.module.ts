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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    NavComponent,
    HomeComponent,
    LibraryComponent,
    AudioComponent
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
