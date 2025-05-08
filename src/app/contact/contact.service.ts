import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getContactCard(userId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/contact-card/${userId}`);
  }

  updateContactCard(contactData: any): Observable<any> {
    const user = this.authService.getCurrentUser();
    const token = user?.token;
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        console.log('Updated contact info being sent:', contactData);
        return this.http.put(`${this.BASE_URL}/update-contact-card`, contactData, { headers });
  }

  uploadImage(image: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/upload-image`, image);
  }

  getPersonality(userId: string): Observable<{ personality: string }> {
    return this.http.get<{ personality: string }>(
      `${this.BASE_URL}/user/${userId}/personality`
    );
  }
}

