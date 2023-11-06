import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Category } from 'src/app/model/CategoryModel';
import { Message } from 'src/app/model/MessageModel';
import { CategoryService } from 'src/app/service/category.service';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  form!: FormGroup
  formControlCategory = new FormControl('', Validators.required)
  categories!: Category[]
  displayedColumns: string[] = ['position', 'name', 'delete']
  constructor(private _categoryService: CategoryService, private _sharedAudioService: SharedAudioService){}

  ngOnInit(){
    this._categoryService.getAll().subscribe({
      next: (data) => this.categories = data
    })
    this.form = new FormGroup({
      category: this.formControlCategory
    })
  }

  onSubmit(){
    const value: string | null = this.formControlCategory.getRawValue()
    if(!this.form.invalid && value!= null){
      const category = new Category()
      category.name = value
      this._categoryService.save(category).subscribe({
        next: (data) => {
          this.categories = data
          this.form.reset()
        }
      })
    }
  }

  delete(id: number){
    this._categoryService.delete(id).subscribe({
      next: (categoryDelete) => {
        this.categories = categoryDelete.categories
        console.log(categoryDelete)
        let message = new Message()
        if(categoryDelete.deleted){
          message.text = "The category has been deleted!"
          this._sharedAudioService.emitMessageChange(message)
        }
        if(categoryDelete.used){
          message.error = true
          message.text = "The category is already used and cant be deleted!"
          this._sharedAudioService.emitMessageChange(message)
        }
      }
    })
  }
}
