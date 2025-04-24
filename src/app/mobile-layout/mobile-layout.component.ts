import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrl: './mobile-layout.component.css'
})
export class MobileLayoutComponent implements OnInit {
  currentScreen: string = 'about';
  menuOpen: boolean = false;
  isUnlocking: boolean = false;
  unlocked: boolean = false;
  isLoggedIn: boolean = false; // ✅ track login status

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    const justLoggedIn = localStorage.getItem('redirectApp') === 'quiz';

    if (!token) {
      this.currentScreen = 'welcome';
    } else if (justLoggedIn) {
      this.runUnlockAnimation();
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
      }, 1000);
    }, 2000);
  }

  switchScreen(screen: string): void {
    this.currentScreen = screen;
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    this.isLoggedIn = false; // ✅ update login state
    this.currentScreen = 'welcome';
    this.menuOpen = false;
  }

  getHeaderTitle(): string {
    switch (this.currentScreen) {
      case 'welcome': return 'Start Here';
      case 'quiz': return 'Quiz';
      case 'about': return 'About';
      case 'results': return 'Results';
      case 'profile': return 'Contact Card';
      case 'feedback': return 'Feedback';
      default: return 'TigerTraits';
    }
  }
}
