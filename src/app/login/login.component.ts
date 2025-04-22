// version with authservice to get user id to log quiz results to db
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  userProfile: any;

  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,// inject authservice
    private profileService: ProfileService
  ) {}

  login() {
    // change localhost route to new api when deployed!!!
    this.http.post<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log(response);

          const user = {
            userId: response.userId,
            email: response.email
          };

          this.authService.setCurrentUser(user);

          // set the current user in authservice
          /*this.authService.setCurrentUser({
            id: response.userId,  // note to self: check if backend returns a user identifier
            email: response.email,
            // can add any other relevant user data here, but i think this is good for now
          });*/

          // emit login success event
          this.loginSuccess.emit(true);



        // Navigate to quiz or dashboard
        this.router.navigate(['/quiz']);
      },
      error: (error) => {
        this.error = error.error.message;
      }
    });




    }
  }
