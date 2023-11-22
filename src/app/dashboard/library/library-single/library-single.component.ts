import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';

@Component({
  selector: 'app-library-single',
  templateUrl: './library-single.component.html',
  styleUrls: ['./library-single.component.scss']
})
export class LibrarySingleComponent {
  audioBook!: AudioBook | null

  constructor(private route: ActivatedRoute, private _audioService: AudioBookService){}

  ngOnInit(){
    let audioId = this.route.snapshot.paramMap.get('id') as string
    this._audioService.getAudioBook(parseInt(audioId)).subscribe({
      next: (data) => this.audioBook = data
    })
  }
}
