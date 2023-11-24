import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/config/api.service';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { SearchContainer } from 'src/app/model/search/SearchContainerModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent {
  @Output() audioEmiter = new EventEmitter<AudioBook>

  constructor(private _apiService: ApiService, public dialog: MatDialog, private _audioBookService: AudioBookService){}

  onChange(event: Event){
    this._apiService.getBooksInfo((event.target as HTMLInputElement).value).subscribe({
      next: (data) => {
        let c = new SearchContainer(data)
        let d = this.dialog.open(DialogComponent, {data:  c})
        d.afterClosed().subscribe({
          next: async (i: number) => {
            let b = new AudioBook()
            b.title = c.items[i].volumeInfo.title
            console.log(c.items[i].volumeInfo)
            if(c.items[i].volumeInfo.authors){
              b.author = c.items[i].volumeInfo.authors[0]
            }
            b.summary = c.items[i].volumeInfo.description
            const response = fetch(data.items[i].volumeInfo.imageLinks.thumbnail);

            this.urlToFile(data.items[i].volumeInfo.imageLinks.thumbnail, 'fileName', 'image/jpeg', (file: any) => {
              console.log(file);
              // Now you have the file object, you can use it as needed
            });
            this.audioEmiter.emit(b)
          }
        })
      }
    })
  }

  urlToFile(imageUrl: string, fileName: string, mimeType: string, callback: any) {
    fetch(imageUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const file = new File([buffer], fileName, { type: mimeType });
        callback(file);
      })
      .catch(error => {
        console.error('Error fetching the image:', error);
      });
  }


}
