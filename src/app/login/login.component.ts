import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/auth/AuthRequestModel';
import { Router } from '@angular/router';
import { ParamService } from '../service/param.service';
import { SharedAudioService } from '../service/shared-audio.service';
import { ThemeService } from '../service/theme.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required])

  constructor(private _authService: AuthService,
    private router: Router,
    private _paramService: ParamService,
    private _sharedAudioService: SharedAudioService,
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
          this.router.navigate(['/dashboard'])
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
