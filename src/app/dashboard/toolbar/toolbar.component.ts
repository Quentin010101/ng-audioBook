import { Component } from '@angular/core';
import { Themes } from 'src/app/model/EnumThemes';
import { Theme } from 'src/app/model/ThemeModel';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    themes!: Theme[];
    classes: string[] = ["color-theme-1","color-theme-2","color-theme-3","color-theme-4","color-theme-5"]

    constructor(private _sharedAudioService: SharedAudioService){
      this.themes = new Array
      let index = 0;
      for (const [key, value] of Object.entries(Themes)) {
        this.themes.push(new Theme(value,key,index))
        index++
      }
    }

    onClick(number: number){
      this._sharedAudioService.emitColorChange(number)
    }
}
