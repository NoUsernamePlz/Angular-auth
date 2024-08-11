import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgForOf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  step = 1;
  step1Form: any;
  step2Form: any;
  designations: string[] = [];
  organizations: { id: string, name: string }[] = [];
  orgError: string = '';
  signupSuccess:boolean= false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.step1Form = this.fb.group({
      name: ['', Validators.required],
      emailOrMobile: [{ value: '', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.step2Form = this.fb.group({
      organizationName: ['', Validators.required],
      organizationId: ['', Validators.required],
      designation: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit() {
    this.designations = this.authService.getDesignations();
    this.organizations = this.authService.getOrganizations();

    if (this.authService.userEmail) {
      this.step1Form.get('emailOrMobile')!.setValue(this.authService.userEmail);
    } else if (this.authService.userMobile) {
      this.step1Form.get('emailOrMobile')!.setValue(this.authService.userMobile);
    }
  }

  onStep1Submit() {
    this.step1Form.markAllAsTouched();
    if (this.step1Form.valid) {
      this.step++;
    }
  }



  onStep2Submit() {
    this.step2Form.markAllAsTouched();
    const orgId = this.step2Form.get('organizationId')?.value;
    const orgName = this.step2Form.get('organizationName')?.value;

    const organization = this.organizations.find(org => org.id === orgId);

    if (!organization) {
      this.orgError = 'Unknown organization-id';
      return;
    }

    if (organization.name !== orgName) {
      this.orgError = 'Organization name does not match the given organization-id';
      return;
    }

    if (this.step2Form.valid) {
  this.signupSuccess= true;
      
    }
  }
 
get Email() { return this.step1Form?.get('emailOrMobile'); }
get Name() { return this.step1Form?.get('name'); }
get Password() { return this.step1Form?.get('password'); }  
get OrganizationName() { return this.step2Form?.get('organizationName'); }
get OrganizationId() { return this.step2Form?.get('organizationId'); }
get Designation() { return this.step2Form?.get('designation'); }
get BirthDate() { return this.step2Form?.get('birthDate'); }
get City() { return this.step2Form?.get('city'); }
get Pincode() { return this.step2Form?.get('pincode'); }


  onBack() {
    this.step--;
  }
}
