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
    return this.http.post('/quiz-results', data, { headers });
  }

  storeQuizResult(userId: string, personalityType: string): Observable<any> {
    return this.http.post('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/quizResults', {
      userId,
      personalityType
    });
  }
}
