// version with authservice to get user id to log quiz results to db
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  isUnlocking: boolean = false;
  unlocked: boolean = false;
  isMobileLayout: boolean = false;

  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openRegister = new EventEmitter<void>();

  // trying to speed up the time in between animation completion and redirect
  @Output() loginSuccessMobile = new EventEmitter<void>();

  // call this when the register link is clicked
  goToRegister() {
    this.openRegister.emit();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService  // inject authservice
  ) {}

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth < 1125 || window.innerHeight < 800;
  }  

  login() {
    // http://localhost:3000/login
    this.http.post<any>('/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log(response);
  
        this.isUnlocking = true;
        this.error = '';
  
        // start animation delay
        setTimeout(() => {
          this.unlocked = true;
  
          setTimeout(() => {
            // save JWT
            localStorage.setItem('token', response.token); // replaced my placeholder token with hesub token
            localStorage.setItem('redirectApp', 'quiz');
  
            // store user info
            //added personalityType to get response to use in results page on login
            this.authService.setCurrentUser({
              id: response.userId,
              email: response.email,
              token: response.token,
              personalityType: response.personalityType
            });

            // mobile: emit directly and skip full page reload
            if (this.isMobileLayout) {
              setTimeout(() => {
                this.loginSuccessMobile.emit(); // let the mobile layout handle animation and screen switch
              }, 500);
            } else {
              // desktop layout
              // tell parent app that login succeeded
              this.loginSuccess.emit(true);
              // nav to root
              this.router.navigate(['/']);
            }

          }, 1200); // checkmark animation time
        }, 3200); // loading bar time
      },
  
      // error: (error) => {
      //   this.error = error.error.message || 'Login failed.';
      //   this.isUnlocking = false;
      //   this.unlocked = false;
      // }

      // added more detailed errors to help with error checking
      error: (error) => {
        console.error('Login request failed:', {
          status: error.status,
          statusText: error.statusText,
          backendMessage: error.error?.message,
          fullError: error
        });
      
        if (error.status === 0) {
          this.error = 'Cannot connect to the server. Please check your network or backend service.';
        } else if (error.status === 401) {
          this.error = error.error?.message || 'Incorrect email or password.';
        } else if (error.status === 500) {
          this.error = 'Server error. Please try again later or check server logs.';
        } else {
          this.error = error.error?.message || 'An unknown error occurred.';
        }
      
        this.isUnlocking = false;
        this.unlocked = false;
      }
    });
  }  
}
