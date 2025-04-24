import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // private apiUrl = 'http://localhost:3000'; // adjust from localhost to new api when deployed!!!
  // private apiUrl = 'http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { 
    
  }

  storeQuizResult(userId: string, personalityType: string): Observable<any> {
    return this.http.post('http://tt-env.eba-ey2xk2m2.us-east-1.elasticbeanstalk.com/quizResults', {
      userId,
      personalityType
    });
  }

  storeCompatibility(userId: string, resultType: string) {
    return this.http.post<any>('http://localhost:3000/compatibilities', {
      userId,
      resultType
    });
  }  
}
