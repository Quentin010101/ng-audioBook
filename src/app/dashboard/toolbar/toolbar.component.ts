import { Component } from '@angular/core';
import { Theme } from 'src/app/model/theme/ThemeModel';
import { Param } from 'src/app/model/user/ParamModel';
import { ParamService } from 'src/app/service/param.service';
import { SharedAudioService } from 'src/app/config/shared-audio.service';
import { ThemeService } from 'src/app/service/theme.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceService } from 'src/app/config/utils-service.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    themes!: Theme[];
    open: boolean = true
    

    constructor(private _themeServie: ThemeService, private _paramService: ParamService, private _utilsService: UtilsServiceService, private _auth: AuthService){
      this._themeServie.getThemes().subscribe({
        next: (themes) => {
          this.themes = themes
        }
      })
      _utilsService.screenSizeSubject.subscribe({
        next: (data) => {
          if(data == 'md' || data == 'sm' || data =='xsm'){
            this.open = false
            this._utilsService.openBehavior.next(this.open)
          }else{
            this.open = true
            this._utilsService.openBehavior.next(this.open)
          }
        }
      })
    }

    onClick(theme: Theme){

      this._paramService.updateThemeParam(theme).subscribe({
        next: (data) => {
          this._themeServie.theme.next(data.theme.className)
        }
      })
    }
    sidenavClick(){
      this.open = !this.open
      this._utilsService.openBehavior.next(this.open)
    }

    logout(){
      this._auth.logout()
    }
}
