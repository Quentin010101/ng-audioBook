import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';
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
      _themeService.isDarkMode.subscribe(mode => {
        this.isDarkMode = mode
        this.setOverlayTheme(mode)
      })
      _themeService.theme.subscribe(theme => {
        this.theme = theme
        this._themeService.getThemes().subscribe(themes =>{
          themes.forEach((t)=>{
            this.overlayContainer.getContainerElement().classList.remove(t.className);
          })
          this.overlayContainer.getContainerElement().classList.add(theme);
        })
      })
  }

  ngOnInit(){
    this.theme = this._themeService.baseTheme
    this.isDarkMode = this._themeService.baseMode
    console.log(this.isDarkMode)
    if(this._authService.isLoggedIn()){
      this._paramService.getParam().subscribe({
        next: (param) => {
          console.log(param)
            this._themeService.isDarkMode.next(param.darkTheme)
            this._themeService.theme.next(param.theme.className)
        }
      })
    }

    this.setOverlayTheme(this.isDarkMode)
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  private setOverlayTheme(theme: boolean){
    this.overlayContainer.getContainerElement().classList.add(theme? 'dark-theme' : 'light-theme');
    this.overlayContainer.getContainerElement().classList.remove(theme? 'light-theme' : 'dark-theme');
  }
}
