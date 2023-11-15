import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceService } from 'src/app/config/utils-service.service';

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


  constructor(private _auth: AuthService, route: Router, private _utilsService: UtilsServiceService){
    _utilsService.openBehavior.subscribe({
      next: (bool) => this.open = bool
    })
  }

  ngOnInit(){
    this.isAdmin = this._auth.isAdmin()
    this.pseudo = this._auth.getPseudo()
    
  }

  logout(){
    this._auth.logout()
  }

}
