import { Component } from '@angular/core';
import { Themes } from 'src/app/model/theme/EnumThemes';
import { Theme } from 'src/app/model/theme/ThemeModel';
import { SharedAudioService } from 'src/app/service/shared-audio.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    themes!: Theme[];
    classes: string[] = ["color-theme-1","color-theme-2","color-theme-3","color-theme-4","color-theme-5"]

    constructor(private _sharedAudioService: SharedAudioService, private _themeServie: ThemeService){
      this._themeServie.getThemes().subscribe({
        next: (themes) => {
          this.themes = themes
        }
      })
    }

    onClick(className: string){
      this._sharedAudioService.emitColorChange(className)
    }
}
