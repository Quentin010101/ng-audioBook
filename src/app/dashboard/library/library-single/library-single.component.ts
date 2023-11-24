import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UtilsServiceService } from 'src/app/config/utils-service.service';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-library-single',
  templateUrl: './library-single.component.html',
  styleUrls: ['./library-single.component.scss']
})
export class LibrarySingleComponent {
  audioBook!: AudioBook | null
  src!: string | null
  screenSize!: string

  constructor(private route: ActivatedRoute, private _audioService: AudioBookService,private _fileService: FileService, private _utilsService: UtilsServiceService){
    this._utilsService.screenSizeSubject.subscribe({
      next: (data) => {
        this.screenSize = data
      }
    })
  }

  ngOnInit(){
    let audioId = this.route.snapshot.paramMap.get('id') as string
    this._audioService.getAudioBook(parseInt(audioId)).subscribe({
      next: (data) => {
        this.audioBook = data
        this._fileService.getImage(this.audioBook.imageFile.id).subscribe({
          next: (data) => {
            let url = window.URL
            this.src = url.createObjectURL(data)
          },
          error: (data) =>{
            this.src = "/assets/image/default_book.avif"
          }
        })
      }
    })
  }
}
