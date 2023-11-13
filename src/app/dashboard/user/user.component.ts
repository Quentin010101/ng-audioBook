import { Component } from '@angular/core';
import { User } from 'src/app/model/user/UserModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!: User[]
  displayedColumns: string[] = ['position', 'pseudo', 'email', 'delete']

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
}
