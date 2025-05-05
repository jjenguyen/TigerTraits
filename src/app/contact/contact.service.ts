import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getContactCard(userId: string): Observable<any> {

      return this.http.get(`/contact-card/${userId}`);
  }

  updateContactCard(contactData: any): Observable<any> {
    const user = this.authService.getCurrentUser();
    const token = user?.token;
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        console.log('Updated contact info being sent:', contactData);
        return this.http.put('/update-contact-card', contactData,
          { headers});
  }

  uploadImage(image: FormData): Observable<any> {
    return this.http.post('/upload-image', image);
  }
}

