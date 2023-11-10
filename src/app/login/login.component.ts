import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/auth/AuthRequestModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  constructor(private _authService: AuthService, private router: Router){}

  ngOnInit(){
    
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  login(){
    console.log(this.form)
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
