import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators,FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form:any;
  contactRegex: string="[5-9][0-9]{9}";
  isUserExists:boolean=false;

  constructor(fb:FormBuilder, private authService:AuthService,private router: Router){
   
   this.form = fb.group({
      email:['',[
        Validators.required,
        Validators.email
      ]],
      mobile:['',[
        Validators.required,
        Validators.pattern(this.contactRegex)
      ]]
    })

  }

  get Email(){
    return this.form.get('email')
  }

  get Mobile(){
    return this.form.get('mobile')
  }


  onSubmit() {
    
    const email = this.form.get('email')?.value;
    const mobile = this.form.get('mobile')?.value;

    if (email && this.authService.userEmailExists(email)) {
      this.isUserExists = true;
      this.router.navigate(['/login']);
    } else if (mobile && this.authService.userMobileExists(mobile)) {
      this.isUserExists = true;
      this.router.navigate(['/login']);
    } else if ((email||mobile)){
      
      this.router.navigate(['/signup']);
    }else{
      this.form.markAllAsTouched();
    }
  }
  
}




