import { Component } from '@angular/core';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

  constructor(private _sharedAudioService: SharedAudioService){}

  onSubmit(){
    this._sharedAudioService.emitThemeChange(true)
  }
}
