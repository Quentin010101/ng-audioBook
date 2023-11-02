import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isAdmin: boolean = false

  constructor(private _auth: AuthService){}

  ngOnInit(){
    this.isAdmin = this._auth.isAdmin()
  }

  logout(){
    this._auth.logout()
  }
}
