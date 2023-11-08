import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../model/MessageModel';

@Injectable({
  providedIn: 'root'
})
export class SharedAudioService {

      // Observable string sources
      private emitChangeSource = new Subject<any>();
      private emitChangeSource2 = new Subject<any>();
      private emitChangeSource3 = new Subject<any>();
      // Observable string streams
      changeEmitted$ = this.emitChangeSource.asObservable();
      messageEmitted$ = this.emitChangeSource2.asObservable()
      themeEmitted$ = this.emitChangeSource3.asObservable()
      // Service message commands
      emitChange(change: any) {
          this.emitChangeSource.next(change);
      }
      emitMessageChange(change: Message){
        this.emitChangeSource2.next(change)
      }
      emitThemeChange(change: boolean){
        this.emitChangeSource3.next(change)
      }


}
