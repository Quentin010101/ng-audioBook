import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() routes!: Routes
  isAdmin: boolean = false
  pseudo!: string
  open: boolean = true


  constructor(private _auth: AuthService, route: Router){}

  ngOnInit(){
    this.isAdmin = this._auth.isAdmin()
    this.pseudo = this._auth.getPseudo()
    
  }

  logout(){
    this._auth.logout()
  }

}
