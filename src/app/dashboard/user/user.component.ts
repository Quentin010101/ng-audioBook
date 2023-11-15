import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { User } from 'src/app/model/user/UserModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!: User[]
  displayedColumns: string[] = [ 'position','pseudo', 'email','creationDate','lastActivityDate', 'accountLocked', 'delete']

  constructor(private _userService: UserService){}

  ngOnInit(){
    this._userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  delete(user: User){

  }

  update(event: MatSlideToggleChange, id: number){
    console.log(event.checked + "  " + id)
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
}
