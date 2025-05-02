import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // use a behaviorsubject to hold the current user data
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // holds app name to open after login
  private loginRedirectAppSubject = new BehaviorSubject<string | null>(null);
  loginRedirectApp$ = this.loginRedirectAppSubject.asObservable();

  constructor(private http: HttpClient) {
    // load any stored user data from local storage when the app starts
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    // load redirect app if previously set
    const storedRedirectApp = localStorage.getItem('redirectApp');
    if (storedRedirectApp) {
      this.loginRedirectAppSubject.next(storedRedirectApp);
    }
  }

  // call this to store user after login
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // retrieve the current user (it could return null if no user is logged in)
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  postQuizResult(quizResult: any): Observable<any> {
    const user = this.getCurrentUser();
    const token = user.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post('http://localhost:3000/quiz-results', quizResult, { headers });
  }

  // set app to open after login (e.g. "quiz")
  setLoginRedirectApp(appName: string | null): void {
    this.loginRedirectAppSubject.next(appName);
    if (appName) {
      localStorage.setItem('redirectApp', appName);
    } else {
      localStorage.removeItem('redirectApp');
    }
  }

  getLoginRedirectApp(): string | null {
    return localStorage.getItem('redirectApp');
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.setLoginRedirectApp(null); // reset any redirect
  }
  deleteAccount() {
    const user = this.getCurrentUser();
    const token = user?.token;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete('http://localhost:3000/api/delete-account', { headers });
  }
  
}

