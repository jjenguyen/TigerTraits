// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   // use a behaviorsubject to hold the current user data
//   private currentUserSubject = new BehaviorSubject<any>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   constructor() {
//     // load any stored user data from local storage when the app starts
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   // call this after a successful login
//   setCurrentUser(user: any): void {
//     this.currentUserSubject.next(user);
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   }

//   // retrieve the current user (it could return null if no user is logged in)
//   getCurrentUser(): any {
//     return this.currentUserSubject.value;
//   }

//   logout(): void {
//     this.currentUserSubject.next(null);
//     localStorage.removeItem('currentUser');
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ Holds current user data
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // ✅ Holds app name to open after login
  private loginRedirectAppSubject = new BehaviorSubject<string | null>(null);
  loginRedirectApp$ = this.loginRedirectAppSubject.asObservable();

  constructor() {
    // Load user from local storage on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    // Load redirect app if previously set
    const storedRedirectApp = localStorage.getItem('redirectApp');
    if (storedRedirectApp) {
      this.loginRedirectAppSubject.next(storedRedirectApp);
    }
  }

  // ✅ Call this to store user after login
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // ✅ Set app to open after login (e.g. "quiz")
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
    this.setLoginRedirectApp(null); // Reset any redirect
  }
}
