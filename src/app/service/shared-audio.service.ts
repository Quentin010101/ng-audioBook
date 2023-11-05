import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAudioService {

      // Observable string sources
      private emitChangeSource = new Subject<any>();
      private emitChangeSource2 = new Subject<any>();
      // Observable string streams
      changeEmitted$ = this.emitChangeSource.asObservable();
      messageEmitted$ = this.emitChangeSource2.asObservable()
      // Service message commands
      emitChange(change: any) {
          this.emitChangeSource.next(change);
      }
      emitMessageChange(change: any){
        this.emitChangeSource2.next(change)
      }


}
