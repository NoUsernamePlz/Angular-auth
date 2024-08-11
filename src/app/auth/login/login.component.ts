import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: any;
  loginError: boolean = false;
  loginSuccess:boolean= false;
  contactRegex: string = "[5-9][0-9]{9}";
  isUserExists: boolean = false;
  invalidCredentials:string='';

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
   
    this.loginForm = fb.group({
      email: [{ value: this.authService.userEmail, disabled: true }, [
        Validators.required,
        Validators.email
      ]],
      mobile: [{ value: this.authService.userMobile, disabled: true }, [
        Validators.required,
        Validators.pattern(this.contactRegex)
      ]],
      password: [this.authService.userMobile, [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }
  

  get Email() {
    return this.loginForm.get('email');
  }

  get Mobile() {
    return this.loginForm.get('mobile');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      const email = this.Email?.value;
    const mobile = this.Mobile?.value;
    const password = this.Password.value;

    if (email && this.authService.validateEmailPassword(email, password)) {
      this.loginSuccess=true;
    } else if (mobile && this.authService.validateMobilePassword(mobile, password)) {
      this.loginSuccess=true;
    } else {
      this.loginError = true;
      this.invalidCredentials='Incorrect password. Please try again';
    }
    }
    
  }
}