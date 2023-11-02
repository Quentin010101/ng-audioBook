import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './utils/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProgressBarComponent } from './dashboard/audio/progress-bar/progress-bar.component';
import { VolumeComponent } from './dashboard/audio/volume/volume.component';
import {ScalingSquaresSpinnerModule } from 'angular-epic-spinners'
import {BreedingRhombusSpinnerModule } from 'angular-epic-spinners';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { ZenComponent } from './utils/icon/zen/zen.component';
import { OffComponent } from './utils/icon/off/off.component';
import { IhomeComponent } from './utils/icon/ihome/ihome.component';
import { IlibraryComponent } from './utils/icon/ilibrary/ilibrary.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddAudioComponent } from './dashboard/add-audio/add-audio.component';
import { AddComponent } from './utils/icon/add/add.component'; 

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
    ProgressBarComponent,
    VolumeComponent,
    SpinnerComponent,
    ZenComponent,
    OffComponent,
    IhomeComponent,
    IlibraryComponent,
    AddAudioComponent,
    AddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScalingSquaresSpinnerModule,
    BreedingRhombusSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
