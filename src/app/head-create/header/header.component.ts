import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private http: HttpClient) {}

  // Example function to send a request with the Authorization header
  sendAuthenticatedRequest() {
    const token = localStorage.getItem('jwtToken'); // Get token from localStorage (or from a service)
    if (!token) {
      console.error('No token found');
      return;
    }

    // Set the Authorization header with the Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Example HTTP request (GET) with Authorization header
    this.http.get('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com', { headers })
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

}
