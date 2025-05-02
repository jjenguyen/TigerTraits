import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrl: './mobile-layout.component.css'
})
export class MobileLayoutComponent implements OnInit {
  currentScreen: string = 'quiz';
  menuOpen: boolean = false;
  isUnlocking: boolean = false;
  unlocked: boolean = false;
  isLoggedIn: boolean = false; // track login status
  isDeleting: boolean = false;
  deleted: boolean = false; // track account deletion status

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  
    if (!token) {
      this.currentScreen = 'welcome';
    } else {
      // no longer reloading the component after login, so ngOnInit() just needs to check for a valid token to set the initial screen
      this.currentScreen = 'quiz';

      // original code
      // this.currentScreen = justLoggedIn ? 'quiz' : 'quiz';
      // localStorage.removeItem('redirectApp');
    }
  }  

  runUnlockAnimation(): void {
    this.isLoggedIn = true;
    this.isUnlocking = true;

    setTimeout(() => {
      this.unlocked = true;

      setTimeout(() => {
        this.isUnlocking = false;
        this.unlocked = false;
        this.currentScreen = 'quiz';
        localStorage.removeItem('redirectApp');
      }, 1200);
    }, 3200);
  }

  // used to update the login status after animation completes to properly unlock the restricted links in nav menu
  onMobileLoginSuccess(): void {
    this.isLoggedIn = true;
  }  

  switchScreen(screen: string): void {
    if (this.isLoggedIn && screen === 'welcome') {
      return; // don't allow returning to welcome after login
    }
    this.currentScreen = screen;
    this.menuOpen = false;
  }  

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    this.isLoggedIn = false; // update login state
    this.currentScreen = 'welcome';
    this.menuOpen = false;
  }

  getHeaderTitle(): string {
    switch (this.currentScreen) {
      case 'welcome':
        return this.isLoggedIn ? 'TigerTraits' : 'Start Here';
      case 'quiz': return 'Quiz';
      case 'about': return 'About';
      case 'results': return 'My Results';
      case 'contact': return 'Contact Card';
      case 'feedback': return 'Feedback';
      case 'notes': return 'Notes';
      case 'register': return 'Register';
      case 'delete-account': return 'Delete Account';
      default: return 'Login';
    }
  }
  
}
