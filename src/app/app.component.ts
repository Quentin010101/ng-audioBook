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
  isDarkMode!: boolean
  theme!: string


  constructor(
    private overlayContainer: OverlayContainer,
    private _authService: AuthService,
    private _paramService: ParamService,
    private _themeService: ThemeService
    ){


  }

  ngOnInit(){

    if(this._authService.isLoggedIn()){
      this._paramService.getParam().subscribe({
        next: (param) => {
          if(param.darkTheme)
            this._themeService.isDarkMode.next(param.darkTheme)
            this.isDarkMode = param.darkTheme
          if(param.theme)
            this._themeService.theme.next(param.theme.className)
            this.theme = param.theme.className
          
        }
      })
    }else{
      this.theme = this._themeService.getTheme()
      this.isDarkMode = this._themeService.getIsDarkMode()
    }

    this.setOverlayTheme(this.isDarkMode)
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  private setOverlayTheme(theme: boolean){
    this.overlayContainer.getContainerElement().classList.add(theme? 'dark-theme' : 'light-theme');
    this.overlayContainer.getContainerElement().classList.remove(theme? 'light-theme' : 'dark-theme');
  }
}
