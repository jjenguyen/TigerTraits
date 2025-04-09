import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  register() {
    // change localhost route to new api when deployed!!!
    this.http.post<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/register', { email: this.email, password: this.password })
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
