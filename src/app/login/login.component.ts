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

  login() {
    this.http.post<any>('http://localhost:3000/login', {
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
            this.authService.setCurrentUser({
              id: response.userId,
              email: response.email
            });
  
            // tell parent app that login succeeded
            this.loginSuccess.emit(true);
  
            // navigate to quiz or home
            this.router.navigate(['/']);
          }, 1200); // checkmark animation time
        }, 3200); // loading bar time
      },
  
      error: (error) => {
        this.error = error.error.message || 'Login failed.';
        this.isUnlocking = false;
        this.unlocked = false;
      }
    });
  }  
}
