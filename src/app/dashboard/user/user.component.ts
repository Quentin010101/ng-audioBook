import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { SharedAudioService } from 'src/app/config/shared-audio.service';
import { Validation } from 'src/app/config/validationConfig';
import { Message } from 'src/app/model/message/MessageModel';
import { SignInRequest } from 'src/app/model/user/SignInRequest';
import { User } from 'src/app/model/user/UserModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!: User[]
  validation = Validation
  displayedColumns: string[] = [ 'position','pseudo', 'email','creationDate','lastActivityDate', 'accountLocked', 'delete']
  dataSource = new MatTableDataSource<User>();
  form!: FormGroup
  pseudo: FormControl = new FormControl('', [Validators.required, Validators.minLength(Validation.pseudo.minLength), Validators.maxLength(Validation.pseudo.maxLength)])
  email: FormControl = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(Validation.email.maxLength)])
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(Validation.password.minLength),  Validators.maxLength(Validation.password.maxLength)])

  constructor(private _userService: UserService, private _sharedAudioService: SharedAudioService){}

  ngOnInit(){
    this.createForm()
    this._userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  delete(user: User){
    this._userService.delete(user.id).subscribe({
      next: (data) => {
        let message = new Message()
        message.text  = 'The user ' + user.pseudo + " has been deleted."
        this._sharedAudioService.emitMessageChange(message)
        this.users = data
      }
    })
  }
  add(){
    if(!this.form.invalid){
      this.form.disable()
      let signin = new SignInRequest(this.form.value)
      this._userService.signin(signin).subscribe({
        next: (data) => {
          let message = new Message()
          this.users = data.object
          if(data.bool){
            message.text  = 'The user ' + this.pseudo.value + " has been created."
          }else{
            message.text = data.message
            message.error = true
          }
          this._sharedAudioService.emitMessageChange(message)
          this.form.reset()
          this.form.enable()
        }
      })
    }
  }

  update(event: MatSlideToggleChange, id: number){
    if(event.checked){
      this._userService.unlockingUser(id).subscribe({
        next: (users) => {
          this.users = users
        }
      })
    }else{
      this._userService.lockingUser(id).subscribe({
        next: (users) => this.users = users
      })
    }

  }
  createForm(){
    this.form = new FormGroup({
      pseudo: this.pseudo,
      email: this.email,
      password: this.password
    })
  }
}
