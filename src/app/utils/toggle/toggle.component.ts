import { Component } from '@angular/core';
import { ParamService } from 'src/app/service/param.service';
import { SharedAudioService } from 'src/app/service/shared-audio.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  darkMode!: boolean

  constructor(private _paramService: ParamService, private _themeService: ThemeService){}

  ngOnInit(){
    this._themeService.isDarkMode.subscribe({
      next: (data) => {
        this.darkMode = data
      }
    })
  }

  onSubmit(){
    this._paramService.updateModeParam(!this.darkMode).subscribe({
      next: (data) => {
          this._themeService.isDarkMode.next(data.darkTheme)
          this.darkMode = data.darkTheme
        }
    })
  }
}
