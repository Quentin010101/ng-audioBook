import { Component } from '@angular/core';
import { SharedAudioService } from './service/shared-audio.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Themes } from './model/EnumThemes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode: boolean = true
  theme: string[] = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5"]
  index: number = 0

  constructor(private _sharedAudioService: SharedAudioService, private overlayContainer: OverlayContainer){
    overlayContainer.getContainerElement().classList.add('dark-theme');
    overlayContainer.getContainerElement().classList.add('theme-1');
    _sharedAudioService.themeEmitted$.subscribe({
      next: (data) => {
        this.isDarkMode = !this.isDarkMode
        if(data){
          overlayContainer.getContainerElement().classList.add('dark-theme');
          overlayContainer.getContainerElement().classList.remove('light-theme');
        }else{
          overlayContainer.getContainerElement().classList.add('light-theme');
          overlayContainer.getContainerElement().classList.remove('dark-theme');
        }
      }
    })
    _sharedAudioService.colorEmitted$.subscribe({
      next: (data) => {
        if(data >= 0 && data < this.theme.length){
            this.theme.forEach((item)=>{
              overlayContainer.getContainerElement().classList.remove(item);
            })
            overlayContainer.getContainerElement().classList.add(this.theme[data]);
          this.index = data
        }
      }
    })
  }
}
