import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('floatingWindow') floatingWindowRef!: ElementRef;
  @ViewChild('dragHandle') dragHandleRef!: ElementRef;

  title = 'TigerTraits-deployed';

  isLoggedIn: boolean = false;
  zIndexCounter: number = 100;
  openApps: { name: string, data?: any, zIndex?: number }[] = [];
  currentTime: string = '';
  isClosing = false;

  selectedProfileUserId: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLogin();
      }
    });

    // // listens for the custom event to open an app - implemented for "take the quiz" function in contact card under my tigertrait section
    // window.addEventListener('openApp', (event: any) => {
    //   const appName = event.detail;
    //   this.openApp(appName);
    // });

    // // event listener for opening a profile
    // window.addEventListener('openApp', (event: any) => {
    //   const { appName, data } = event.detail;
    //   if (appName === 'viewProfile' && data) {
    //     this.handleProfileOpen(data);
    //   } else {
    //     this.openApp(appName);
    //   }
    // });

    // unified event listener for opening apps and profiles
    window.addEventListener('openApp', (event: any) => {
      const { appName, data } = event.detail;

      // handle opening the contact (profile) window
      if (appName === 'contact' && data) {
        this.handleProfileOpen(data);
      } else {
        this.openApp(appName, data);
      }
    });

    // default to welcome
    if (!this.isLoggedIn) {
      this.openApp('welcome');
    }
  }

// NEW CODE - method to open a profile when clicked
// handle opening the profile with the correct user ID
handleProfileOpen(userId: string): void {
  if (userId) {
    // open the contact window with the user ID
    this.openApp('contact', userId);
  } else {
    console.error('Invalid user ID');
  }
}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.reapplyDraggable();
    }, 100);
  }

  updateClock(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  checkLogin(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  // opens the window if its not open, or brings it to the front if it is already open
  // openApp(appName: string, data?: any): void {
  //   if (this.isLoggedIn || this.isAppAlwaysUnlocked(appName)) {
  //     const existing = this.openApps.find(app => app.name === appName && (!data || app.data === data));
  //     if (!existing) {
  //       this.zIndexCounter++;
  //       this.openApps.push({ name: appName, data, zIndex: this.zIndexCounter });
  //       setTimeout(() => this.reapplyDraggable(), 50);
  //     } else {
  //       this.bringToFront(existing);
  //     }
  //   }
  // }  
  // NEW CODE VERSION - open the window if it's not open, or bring it to the front if it is already open
  openApp(appName: string, data?: any): void {
    if (this.isLoggedIn || this.isAppAlwaysUnlocked(appName)) {
      // unify the profile view to always use 'contact' as the app name
      if (appName === 'viewProfile') {
        appName = 'contact';
      }
      
      // ensure the data is a user ID string, not an object
      const formattedData = (typeof data === 'object') ? data.userId : data;
      const existing = this.openApps.find(app => app.name === appName && app.data === formattedData);
  
      if (!existing) {
        this.zIndexCounter++;
        this.openApps.push({ name: appName, data: formattedData, zIndex: this.zIndexCounter });
        setTimeout(() => this.reapplyDraggable(), 50);
      } else {
        this.bringToFront(existing);
      }
    }
  }
  

  closeApp(appName: string): void {
    this.openApps = this.openApps.filter(app => app.name !== appName);
  }

  isAppAlwaysUnlocked(app: string): boolean {
    return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
  }

  isAppLocked(app: string): boolean {
    return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
  }

  onLoginSuccess(success: boolean): void {
    if (success) {
      this.isLoggedIn = true;
  
      // clear all the current windows
      this.openApps = [];
  
      // give angular some time to update `isLoggedIn` before opening new window
      setTimeout(() => {
        this.openApp('quiz');
      }, 50);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.openApps = [{ name: 'welcome' }];
    this.authService.logout();
    this.router.navigate(['/']);

    setTimeout(() => this.reapplyDraggable(), 50);
  }

  confirmDelete() {
    if (confirm("This will permanently delete your account. Are you sure?")) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          alert("Your account has been deleted.");
          this.logout(); 
        },
        error: err => {
          console.error(err);
          alert("There was an error deleting your account. Please try again.");
        }
      });
    }
  }
  
  handleStartClick(): void {
    if (!this.isLoggedIn) {
      this.openApp('welcome');
    }
  }

  getWindowClass(app: string): string {
    switch (app) {
      case 'quiz': return 'window-quiz';
      case 'contact': return 'window-contact';
      case 'results': return 'window-results';
      case 'about': return 'window-about';
      case 'feedback': return 'window-feedback';
      case 'notes': return 'window-notes';
      case 'register': return 'window-register';
      case 'deleteAccount': return 'window-delete-account';
      case 'login': return 'window-login';
      case 'welcome':
      default: return 'window-default';
    }
  }

  reapplyDraggable(): void {
    setTimeout(() => {
      const headers = document.querySelectorAll('.window-header-bar');
      const windows = document.querySelectorAll('.floating-window');
      windows.forEach((win, i) => {
        const handle = headers[i];
        if (win && handle) {
          this.makeDraggable(win as HTMLElement, handle as HTMLElement);
        }
      });
    }, 50);
  }

  makeDraggable(elmnt: HTMLElement, handle: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const container = document.querySelector('.desktop-container') as HTMLElement;

    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let newTop = elmnt.offsetTop - pos2;
      let newLeft = elmnt.offsetLeft - pos1;

      const maxTop = container.clientHeight - elmnt.clientHeight;
      const maxLeft = container.clientWidth - elmnt.clientWidth;

      newTop = Math.max(0, Math.min(newTop, maxTop));
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));

      elmnt.style.top = `${newTop}px`;
      elmnt.style.left = `${newLeft}px`;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  bringToFront(app: any): void {
    this.zIndexCounter++;
    app.zIndex = this.zIndexCounter;
  }
}
