import { Component } from '@angular/core';
import { SharedAudioService } from './service/shared-audio.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';
import { Theme } from './model/theme/ThemeModel';
import { AuthService } from './service/auth.service';
import { ParamService } from './service/param.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode: boolean = true
  theme: string = "theme-1"


  constructor(private _sharedAudioService: SharedAudioService,
    private overlayContainer: OverlayContainer,
    private _authService: AuthService,
    private _paramService: ParamService
    ){

    this.setOverlayTheme(this.isDarkMode)
    overlayContainer.getContainerElement().classList.add(this.theme);
    _sharedAudioService.themeEmitted$.subscribe({
      next: (data) => {
        this.isDarkMode = !this.isDarkMode
        this.setOverlayTheme(this.isDarkMode)
      }
    })
     _sharedAudioService.colorEmitted$.subscribe({
       next: (data) => {
         if(data >= 0 && data < this.theme.length){
            overlayContainer.getContainerElement().classList.remove(this.theme);
            overlayContainer.getContainerElement().classList.add(this.theme[data]);
            this.theme = this.theme[data]
         }
       }
     })
  }

  ngOnInit(){
    let isloggedIn = this._authService.isLoggedIn()
    if(isloggedIn){
      this._paramService.getParam().subscribe({
        next: (param) => {
          if(param.darkTheme)
            this.isDarkMode = param.darkTheme
          if(param.theme)
            this.theme = param.theme.className
          
        }
      })
    }
  }

  private setOverlayTheme(theme: boolean){
    this.overlayContainer.getContainerElement().classList.add(theme? 'dark-theme' : 'light-theme');
    this.overlayContainer.getContainerElement().classList.remove(theme? 'light-theme' : 'dark-theme');
  }
}
