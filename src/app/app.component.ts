import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './service/theme.service';
import { AuthService } from './service/auth.service';
import { ParamService } from './service/param.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UtilsServiceService } from './config/utils-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode!: boolean
  theme!: string
  currentScreenSize!: string;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xsm'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xlg'],
  ]);

  constructor(
    private overlayContainer: OverlayContainer,
    private _authService: AuthService,
    private _paramService: ParamService,
    private _themeService: ThemeService,
    private _utilsService: UtilsServiceService,
    private responsive: BreakpointObserver
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
    if(this._authService.isLoggedIn()){
      this._paramService.getParam().subscribe({
        next: (param) => {
            this._themeService.isDarkMode.next(param.darkTheme)
            this._themeService.theme.next(param.theme.className)
        }
      })
    }

    this.setOverlayTheme(this.isDarkMode)
    this.overlayContainer.getContainerElement().classList.add(this.theme);

    // responsive
    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ] )
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            this._utilsService.screenSizeSubject.next(this.currentScreenSize)
            console.log("eeee")
        }
      }
    });
  }

  private setOverlayTheme(theme: boolean){
    this.overlayContainer.getContainerElement().classList.add(theme? 'dark-theme' : 'light-theme');
    this.overlayContainer.getContainerElement().classList.remove(theme? 'light-theme' : 'dark-theme');
  }
}
