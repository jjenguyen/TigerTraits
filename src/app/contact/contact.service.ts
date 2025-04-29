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

  updateContactCard(contactData: any): Observable<any> {
    const user = this.authService.getCurrentUser();
    const token = user?.token;
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.put('/update-contact-card', contactData,
          { headers});

    //return this.http.put('https://tigertraits.com/update-contact-card',contactData);

  }
}
