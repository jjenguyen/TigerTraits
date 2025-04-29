import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // private apiUrl = 'http://localhost:3000'; // adjust from localhost to new api when deployed!!!
  // private apiUrl = 'http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient, private authService: AuthService) {} 

  postQuizResult(data: any): Observable<any> {
    const user = this.authService.getCurrentUser();
    const token = user?.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post('http://localhost:3000/quizResults', data, { headers });
  }

  // need to include JWT token in the header so backend can verify
  storeQuizResult(userId: string, personalityType: string): Observable<any> {
    const user = this.authService.getCurrentUser();
    const token = user?.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post('http://localhost:3000/quizResults', { userId, personalityType }, { headers });
  }
  

  storeCompatibility(userId: string, resultType: string) {
    // http://localhost:3000/compatibilities
    return this.http.post<any>('http://localhost:3000/compatibilities', {
      userId,
      resultType
    });
  }  
}
