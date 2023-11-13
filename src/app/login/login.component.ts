import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/auth/AuthRequestModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from '../service/param.service';
import { SharedAudioService } from '../config/shared-audio.service';
import { ThemeService } from '../service/theme.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup
  messageError!: string | null
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  constructor(private _authService: AuthService,
    private router: Router,
    private _paramService: ParamService,
    private _themeService: ThemeService
    ){
    if(_authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(){
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  login(){
    if(!this.form.invalid){
      let auth = new LoginRequest()
      auth = this.form.value
      this._authService.login(auth).subscribe({
        next: (data) => {
          this.setTheme()
          this.router.navigate(['/dashboard/home'])
        },
        error: (error) => {
          if(error.status == 403 || error.status == 401){
            this.messageError = "The credentials you supplied were not correct."
          }else{
            this.messageError = "Something went wrong."
          }
        }
      })
    }
  }

  setTheme(){
    this._paramService.getParam().subscribe({
      next: (param) => {
        this._themeService.isDarkMode.next(param.darkTheme)
        this._themeService.theme.next(param.theme.className)
      }
    })
  }
}
