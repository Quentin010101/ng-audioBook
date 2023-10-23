import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/AuthRequestModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup

  constructor(private _authService: AuthService, private router: Router){}

  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(){
    if(!this.form.invalid){
      let auth = new LoginRequest()
      auth = this.form.value
      this._authService.login(auth).subscribe({
        next: (data) => {
          this.router.navigate(['/dashboard'])
        }
      })
    }
  }
}
