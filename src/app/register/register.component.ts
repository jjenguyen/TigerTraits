import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  hasUpperCase: boolean = false;
  hasNumber: boolean = false;
  hasLowerCase: boolean = false;

  @Output() openLogin = new EventEmitter<void>();

  // call this when the sign in link is clicked
  goToLogin() {
    this.openLogin.emit();
  }

  constructor(private http: HttpClient) {}

  validatePassword(password: string) {
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
  }


  register() {
    // change localhost route to new api when deployed!!!
    // http://localhost:3000/register
    this.http.post<any>('http://localhost:3000/register', { email: this.email, password: this.password })
    //this.http.post<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/register', { email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          // check if the response contains a success message
          console.log(response);
          if (response && response.message) {
            // set the success message, clear the error message
            this.successMessage = response.message;
            this.errorMessage = '';
            // clear input fields
            this.email = '';
            this.password = '';
          }
        },
        error: (error) => {
          // handle registration error
          console.error(error);
          if (error && error.error && error.error.message) {
            // set the error message, clear the success message
            this.errorMessage = error.error.message;
            this.successMessage = '';
          }
        }
      });
  }
}
