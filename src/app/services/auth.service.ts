import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'user1@example.com', mobile: '1234567890', password: 'password123' },
    { email: 'user2@example.com', mobile: '0987654321', password: 'password456' },
    { email: 'user3@example.com', mobile: '1122334455', password: 'password789' },
    { email: '', mobile: '6677889900', password: 'password321' }
  ];

  private organizations = [
    { id: 'org1', name: 'Organization One' },
    { id: 'org2', name: 'Organization Two' },
    { id: 'org3', name: 'Organization Three' }
  ];

  private designations = ['Developer', 'Manager', 'Tester', 'Designer'];

  userEmail: string = '';
  userMobile: string = '';

  userEmailExists(email: string): boolean {
    const userExists = this.users.some(user => user.email === email);
    if (email) {
      this.userEmail = email;
    }
    return userExists;
  }

  userMobileExists(mobile: string): boolean {
    const userExists = this.users.some(user => user.mobile === mobile);
    if (mobile) {
      this.userMobile = mobile;
    }
    return userExists;
  }

  validateEmailPassword(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email);
    return user ? user.password === password : false;
  }

  validateMobilePassword(mobile: string, password: string): boolean {
    const user = this.users.find(user => user.mobile === mobile);
    return user ? user.password === password : false;
  }

  getOrganizations() {
    return this.organizations;
  }

  getDesignations() {
    return this.designations;
  }

  validateOrganization(orgId: string): boolean {
    return this.organizations.some(org => org.id === orgId);
  }
}
