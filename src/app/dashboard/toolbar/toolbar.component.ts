import { Component } from '@angular/core';
import { Theme } from 'src/app/model/theme/ThemeModel';
import { Param } from 'src/app/model/user/ParamModel';
import { ParamService } from 'src/app/service/param.service';
import { SharedAudioService } from 'src/app/config/shared-audio.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    themes!: Theme[];

    constructor(private _sharedAudioService: SharedAudioService, private _themeServie: ThemeService, private _paramService: ParamService){
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
}
