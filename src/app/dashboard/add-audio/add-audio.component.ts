import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { Category } from 'src/app/model/CategoryModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { CategoryService } from 'src/app/service/category.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss']
})
export class AddAudioComponent {
  form!: FormGroup
  formFile!: FormGroup
  bookF!: File | null
  imageF!: File | null
  fileName: string = '';
  imageName: string = '';
  fileSize!: number;
  category!: Category[]

  constructor(private _audioBookService: AudioBookService,
    private _fileService: FileService,
    private _categoryService: CategoryService){

  }

  ngOnInit(){
    this.initForms()
    this._categoryService.getAll().subscribe({
      next: (data) =>{
        this.category = data
      }
    })
  }

  initForms(){
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      summary: new FormControl('',[ Validators.required, Validators.maxLength(2000)]),
      category: new FormControl('', Validators.required),
    })
    this.formFile = new FormGroup({
      bookFile: new FormControl('', Validators.required),
      imageFile: new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    if(!this.form.invalid){
      if(this.bookF && this.imageF){
        this.disableForm()

        const audioBook = new AudioBook(this.form.value)
        const formData = new FormData();

        formData.append('fileB', this.bookF)
        formData.append('fileI', this.imageF)
        this._audioBookService.save(audioBook).subscribe({
          next: (book) => {
            
            this._fileService.save(book.id, formData).subscribe({
              next: (data) => {
                this.reset()
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

  reset(){
    this.form.reset()
    this.formFile.reset()
    this.fileName = ''
    this.fileSize = 0
    this.imageName = ''
    this.bookF = null
    this.imageF = null
    this.enableForm()
  }

  disableForm(){
    this.form.disable()
    this.formFile.disable()
  }
  enableForm(){
    this.form.enable()
    this.formFile.enable()
  }
}
