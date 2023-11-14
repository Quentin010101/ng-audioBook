import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pseudo!: string
  constructor(private _authService: AuthService){}

  ngOnInit(){
    this.pseudo = this._authService.getPseudo()
  }
}
