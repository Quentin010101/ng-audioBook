import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
  trigger('flyInOut', [
    state('in', style({ transform: 'translateX(500%)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({ transform: 'translateX(100%)' }))
    ])
  ])
]
})
export class HomeComponent {
  pseudo!: string
  constructor(private _authService: AuthService){}

  ngOnInit(){
    this.pseudo = this._authService.getPseudo()
  }
}
