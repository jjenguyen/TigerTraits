import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {

  }
  /*storeProfileData(userId: string, name: string, bio:string, picture:string, socials:string, personalityType: string): Observable<any> {
    return this.http.post('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/profile', {
      userId,
      name,
      bio,
      picture,
      socials,
      personalityType
    });
  }*/
  createProfile(profileData: any): Observable<any> {
    return this.http.post('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/profile', profileData);
  }
  updateProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/profile/' + userId, profileData);
  }
  getProfile(userId: string): Observable<any> {
    return this.http.get<any>('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/profile/'+ userId);
  }
}

