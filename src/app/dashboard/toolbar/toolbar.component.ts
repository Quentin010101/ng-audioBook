import { Component } from '@angular/core';
import { Theme } from 'src/app/model/theme/ThemeModel';
import { Param } from 'src/app/model/user/ParamModel';
import { ParamService } from 'src/app/service/param.service';
import { SharedAudioService } from 'src/app/config/shared-audio.service';
import { ThemeService } from 'src/app/service/theme.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceService } from 'src/app/config/utils-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    themes!: Theme[];
    open: boolean = true
    

    constructor(private _themeServie: ThemeService, private _paramService: ParamService, private _utilsService: UtilsServiceService){
      this._themeServie.getThemes().subscribe({
        next: (themes) => {
          this.themes = themes
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
}
