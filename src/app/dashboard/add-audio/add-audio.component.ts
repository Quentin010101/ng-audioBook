import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss']
})
export class AddAudioComponent {
  form!: FormGroup
  formFile!: FormGroup
  bookF!: File
  imageF!: File
  fileName: string = '';
  imageName: string = '';
  fileSize!: number;

  constructor(private _audioBookService: AudioBookService, private _fileService: FileService){

  }

  ngOnInit(){
    this.initForms()
  }

  initForms(){
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      summary: new FormControl('',[ Validators.required, Validators.maxLength(2000)])
    })
    this.formFile = new FormGroup({
      bookFile: new FormControl(''),
      imageFile: new FormControl(''),
    })
  }

  onSubmit(){
    if(!this.form.invalid){
      if(this.bookF && this.imageF){
        const audioBook = new AudioBook(this.form.value)
        this._audioBookService.save(audioBook).subscribe({
          next: (book) => {
            const formData1 = new FormData();
            const formData2 = new FormData();

            formData1.append('file', this.bookF)
            formData2.append('file', this.imageF)
            
            this._fileService.save(book.id, formData1, formData2).subscribe({
              next: (data) => {
                console.log(data)
              }
            })
          }
        })

      }
    }
  }

  onBookFileSelected(e: Event){
    const files: FileList | null= (e.target as HTMLInputElement).files;
    if(files && files?.length > 0){
        this.bookF = files[0]
        this.fileName = this.bookF.name
        this.fileSize = Math.trunc(10 * this.bookF.size / (1024*1024))/10
    }
  }

  onImageFileSelected(e: Event){
    const files: FileList | null= (e.target as HTMLInputElement).files;
    if(files && files?.length > 0){
      this.imageF = files[0]
      this.imageName = this.imageF.name
    }

  }
}
