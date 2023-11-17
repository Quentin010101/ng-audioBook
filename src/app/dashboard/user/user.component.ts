import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Validation } from 'src/app/config/validationConfig';
import { SignInRequest } from 'src/app/model/user/SignInRequest';
import { User } from 'src/app/model/user/UserModel';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(private _userService: UserService, private _authService: AuthService){}

  ngOnInit(){
    this.createForm()
    this._userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  delete(id: number){
    this._userService.delete(id)
  }
  add(){
    if(!this.form.invalid){
      console.log("hey")
      let signin = new SignInRequest(this.form.value)
      this._authService.signin(signin).subscribe({
        next: (user) => {
          this.users.push(user)
          console.log(this.dataSource)
          this.dataSource.data
          console.log(this.dataSource)
        }
      })
    }
  }

  update(event: MatSlideToggleChange, id: number){
    if(event.checked){
      this._userService.unlockingUser(id).subscribe({
        next: (users) => this.users = users
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
