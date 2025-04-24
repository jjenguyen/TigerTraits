// version with authservice to get user id to log quiz results to db
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isUnlocking: boolean = false;
  unlocked: boolean = false;

  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openRegister = new EventEmitter<void>();

  // call this when the register link is clicked
  goToRegister() {
    this.openRegister.emit();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService  // inject authservice
  ) {}

  // login() {
  //   // change localhost route to new api when deployed!!!
  //   this.http.post<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/login', { email: this.email, password: this.password })
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);

  //         // TEMP: store a fake token for now (hesub will replace with real one later)
  //         localStorage.setItem('token', 'placeholder');
          
  //         localStorage.setItem('redirectApp', 'quiz');  // store it directly
  //         this.router.navigate(['/']);

  //         // set the current user in authservice
  //         this.authService.setCurrentUser({
  //           id: response.userId,  // note to self: check if backend returns a user identifier
  //           email: response.email,
  //           // can add any other relevant user data here, but i think this is good for now
  //         });

  //         // set redirect to quiz after login
  //         this.authService.setLoginRedirectApp('quiz');

  //         // notify parent that login succeeded
  //         this.loginSuccess.emit(true);

  //         // refresh root
  //         this.router.navigate(['/']);
  //       },
  //       error: (error) => {
  //         // handle login error
  //         this.error = error.error.message;
  //       }
  //     });
  // }

  login() {
    this.http.post<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        // ✅ Only show unlocking screen if login is successful
        this.isUnlocking = true;
        this.error = ''; // clear any previous error
  
        setTimeout(() => {
          this.unlocked = true;
  
          setTimeout(() => {
            localStorage.setItem('token', 'placeholder');
            localStorage.setItem('redirectApp', 'quiz');
  
            this.authService.setCurrentUser({
              id: response.userId,
              email: response.email
            });
  
            this.loginSuccess.emit(true);
            this.router.navigate(['/']);
          }, 1200); // time for checkmark animation
        }, 3200); // time for loading bar
      },
  
      error: (err) => {
        // ✅ No loading bar at all if login fails
        this.error = err.error.message || 'Login failed.';
        this.isUnlocking = false;
        this.unlocked = false;
      }
    });
  }  
}
