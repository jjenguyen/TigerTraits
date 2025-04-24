// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;

//   onLoginSuccess(event: boolean) {
//     this.isLoggedIn = event;
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { AuthService } from './login/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;
//   activeApp: string = localStorage.getItem('token') ? '' : 'welcome';
//   currentTime: string = '';
//   isClosing = false;
//   windowAnimationClass = ''; // new line: for re-triggering animation

//   constructor(private router: Router, private authService: AuthService) {}

//   // ngOnInit(): void {
//   //   this.checkLogin();
//   //   this.updateClock();
//   //   setInterval(() => this.updateClock(), 1000);

//   //   this.router.events.subscribe(event => {
//   //     if (event instanceof NavigationEnd) {
//   //       this.checkLogin();
//   //     }
//   //   });
//   // }

//   // ngOnInit(): void {
//   //   this.checkLogin();
//   //   this.updateClock();
//   //   setInterval(() => this.updateClock(), 1000);
  
//   //   this.router.events.subscribe(event => {
//   //     if (event instanceof NavigationEnd) {
//   //       this.checkLogin();
//   //     }
//   //   });
  
//   //   // listen for redirect app after login
//   //   this.authService.loginRedirectApp$.subscribe(app => {
//   //     if (app && this.isLoggedIn) {
//   //       this.activeApp = app;
//   //       this.authService.setLoginRedirectApp(null); // clear it
//   //     }
//   //   });
//   // }

//   ngOnInit(): void {
//     this.checkLogin();
//     this.updateClock();
//     setInterval(() => this.updateClock(), 1000);
  
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkLogin();
//       }
//     });
  
//     // ✅ move redirect logic inside a setTimeout to allow login state to fully update
//     setTimeout(() => {
//       const redirectApp = this.authService.getLoginRedirectApp();
//       if (this.isLoggedIn && redirectApp) {
//         this.activeApp = redirectApp;
//         this.authService.setLoginRedirectApp(null); // clear it
//       }
//     }, 50); // a slight delay ensures isLoggedIn is true before triggering
//   }

//   updateClock(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   checkLogin(): void {
//     const token = localStorage.getItem('token');
//     this.isLoggedIn = !!token;
//   }

//   openApp(app: string): void {
//     if (this.isLoggedIn || this.isAppAlwaysUnlocked(app)) {
//       this.activeApp = ''; // temporarily clear it
  
//       setTimeout(() => {
//         this.activeApp = app;
//       }, 20); // slight delay triggers re-mount and CSS animation
//     }
//   }

//   closeApp(): void {
//     this.isClosing = true;

//     setTimeout(() => {
//       this.activeApp = '';
//       this.isClosing = false;
//       this.windowAnimationClass = ''; // reset animation class too
//     }, 200); // match your popOut duration
//   }

//   isAppAlwaysUnlocked(app: string): boolean {
//     return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
//   }

//   isAppLocked(app: string): boolean {
//     return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.activeApp = 'welcome';
//     this.router.navigate(['/']);
//   }

//   handleStartClick(): void {
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { AuthService } from './login/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;
//   activeApp: string = localStorage.getItem('token') ? '' : 'welcome';
//   currentTime: string = '';
//   isClosing = false;
//   windowAnimationClass = '';

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.checkLogin();
//     this.updateClock();
//     setInterval(() => this.updateClock(), 1000);
  
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkLogin();
  
//         const redirectApp = localStorage.getItem('redirectApp');
//         console.log('🌟 LocalStorage redirectApp:', redirectApp);
//         console.log('🔄 isLoggedIn:', this.isLoggedIn);
  
//         if (this.isLoggedIn && redirectApp) {
//           this.openApp(redirectApp);
//           localStorage.removeItem('redirectApp');
//         }
//       }
//     });
//   }  

//   updateClock(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   checkLogin(): void {
//     const token = localStorage.getItem('token');
//     this.isLoggedIn = !!token;
//   }

//   openApp(app: string): void {
//     if (this.isLoggedIn || this.isAppAlwaysUnlocked(app)) {
//       this.activeApp = '';
//       setTimeout(() => {
//         this.activeApp = app;
//       }, 20);
//     }
//   }

//   closeApp(): void {
//     this.isClosing = true;
//     setTimeout(() => {
//       this.activeApp = '';
//       this.isClosing = false;
//       this.windowAnimationClass = '';
//     }, 200);
//   }

//   isAppAlwaysUnlocked(app: string): boolean {
//     return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
//   }

//   isAppLocked(app: string): boolean {
//     return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.activeApp = 'welcome';
//     this.authService.logout();
//     this.router.navigate(['/']);
//   }

//   handleStartClick(): void {
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }
// }

// app.component.ts
// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { AuthService } from './login/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   @ViewChild('floatingWindow') floatingWindowRef!: ElementRef;
//   @ViewChild('dragHandle') dragHandleRef!: ElementRef;

//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;
//   activeApp: string = localStorage.getItem('token') ? '' : 'welcome';
//   currentTime: string = '';
//   isClosing = false;
//   windowAnimationClass = '';

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.checkLogin();
//     this.updateClock();
//     setInterval(() => this.updateClock(), 1000);

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkLogin();
//       }
//     });
//   }

//   ngAfterViewInit(): void {
//     if (this.floatingWindowRef && this.dragHandleRef) {
//       this.makeDraggable(this.floatingWindowRef.nativeElement, this.dragHandleRef.nativeElement);
//     }
//   }

//   onLoginSuccess(success: boolean): void {
//     if (success) {
//       this.isLoggedIn = true;
//       this.openApp('quiz');
//     }
//   }

//   updateClock(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   checkLogin(): void {
//     const token = localStorage.getItem('token');
//     this.isLoggedIn = !!token;
//   }

//   openApp(app: string): void {
//     if (this.isLoggedIn || this.isAppAlwaysUnlocked(app)) {
//       this.isClosing = true;
  
//       setTimeout(() => {
//         this.isClosing = false;
//         this.activeApp = app;
//         if (app !== 'viewProfile') {
//           this.selectedProfileUserId = null;
//         }
  
//         // reattaches makeDraggable() each time the app is opened and not just when activeApp is empty
//         // HAVE to do it this way bc if not, the draggable function does not work after the user logs out and is redirected to the welcome page, you have to manually refresh the page for the drag function to work again
//         setTimeout(() => {
//           if (this.floatingWindowRef && this.dragHandleRef) {
//             this.makeDraggable(
//               this.floatingWindowRef.nativeElement,
//               this.dragHandleRef.nativeElement
//             );
//           }
//         }, 50); // 50ms ensures elements are rendered
//       }, 200); // match your popOut timing
//     }
//   }

//   closeApp(): void {
//     this.isClosing = true;
//     setTimeout(() => {
//       this.activeApp = '';
//       this.isClosing = false;
//       this.windowAnimationClass = '';
//     }, 200);
//   }

//   isAppAlwaysUnlocked(app: string): boolean {
//     return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
//   }

//   isAppLocked(app: string): boolean {
//     return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.activeApp = 'welcome';
//     this.authService.logout();
//     this.router.navigate(['/']);
//   }

//   handleStartClick(): void {
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }

//   getWindowClass(app: string): string {
//     switch (app) {
//       case 'quiz':
//         return 'window-quiz';
//       case 'profile':
//         return 'window-profile';
//       case 'results':
//         return 'window-results';
//       case 'about':
//         return 'window-about';
//       case 'feedback':
//         return 'window-feedback';
//       case 'notes':
//         return 'window-notes';
//       case 'register':
//         return 'window-register';
//       case 'login':
//         return 'window-login';
//       case 'welcome':
//       default:
//         return 'window-default';
//     }
//   }

//   // https://www.w3schools.com/howto/howto_js_draggable.asp
//   makeDraggable(elmnt: HTMLElement, handle: HTMLElement) {
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
//     const container = document.querySelector('.desktop-container') as HTMLElement;
  
//     handle.onmousedown = dragMouseDown;
  
//     function dragMouseDown(e: MouseEvent) {
//       e.preventDefault();
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//       document.onmousemove = elementDrag;
//     }
  
//     function elementDrag(e: MouseEvent) {
//       e.preventDefault();
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;
  
//       // Calculate new position
//       let newTop = elmnt.offsetTop - pos2;
//       let newLeft = elmnt.offsetLeft - pos1;
  
//       // Get boundaries
//       const maxTop = container.clientHeight - elmnt.offsetHeight;
//       const maxLeft = container.clientWidth - elmnt.offsetWidth;
  
//       // Clamp to boundaries
//       newTop = Math.max(0, Math.min(newTop, maxTop));
//       newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  
//       // Apply position
//       elmnt.style.top = `${newTop}px`;
//       elmnt.style.left = `${newLeft}px`;
//     }
  
//     function closeDragElement() {
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//   }  

//   selectedProfileUserId: string | null = null;

//   openProfile(userId: string): void {
//     if (this.isLoggedIn) {
//       this.selectedProfileUserId = userId;
//       this.activeApp = 'viewProfile';
      
//       // ensure draggable re-attaches
//       setTimeout(() => {
//         if (this.floatingWindowRef && this.dragHandleRef) {
//           this.makeDraggable(this.floatingWindowRef.nativeElement, this.dragHandleRef.nativeElement);
//         }
//       }, 50);
//     }
//   }
// }

// // app.component.ts
// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { AuthService } from './login/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   @ViewChild('floatingWindow') floatingWindowRef!: ElementRef;
//   @ViewChild('dragHandle') dragHandleRef!: ElementRef;

//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;
//   openApps: { name: string, data?: any }[] = [];
//   currentTime: string = '';
//   isClosing = false;

//   selectedProfileUserId: string | null = null;

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.checkLogin();
//     this.updateClock();
//     setInterval(() => this.updateClock(), 1000);

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkLogin();
//       }
//     });

//     // default to welcome
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }

//   ngAfterViewInit(): void {
//     setTimeout(() => {
//       this.reapplyDraggable();
//     }, 100);
//   }

//   isStartupApp(appName: string): boolean {
//     return ['welcome', 'login', 'register'].includes(appName);
//   }

//   onLoginSuccess(success: boolean): void {
//     if (success) {
//       this.isLoggedIn = true;
  
//       // Close all startup windows
//       this.openApps = this.openApps.filter(app => !this.isStartupApp(app.name));
  
//       // Open the first unlocked app (e.g., quiz or profile)
//       this.openApp('quiz');
//     }
//   }  

//   updateClock(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   checkLogin(): void {
//     const token = localStorage.getItem('token');
//     this.isLoggedIn = !!token;
//   }

//   // openApp(appName: string, data?: any): void {
//   //   if (this.isLoggedIn || this.isAppAlwaysUnlocked(appName)) {
//   //     const exists = this.openApps.find(app => app.name === appName && (!data || app.data === data));
//   //     if (!exists) {
//   //       this.openApps.push({ name: appName, data });
//   //       setTimeout(() => this.reapplyDraggable(), 50);
//   //     }
//   //   }
//   // }

//   openApp(app: string, data: any = null): void {
//     if (!this.isLoggedIn && !this.isAppAlwaysUnlocked(app)) return;
  
//     // Prevent duplicate of the same app and data
//     const alreadyOpen = this.openApps.find(a => a.name === app && (!data || a.data === data));
//     if (alreadyOpen) return;
  
//     this.openApps.push({ name: app, data });
  
//     // Reattach makeDraggable for the latest window
//     setTimeout(() => {
//       const allWindows = document.querySelectorAll('.floating-window');
//       const lastWindow = allWindows[allWindows.length - 1] as HTMLElement;
  
//       if (lastWindow) {
//         const handle = lastWindow.querySelector('.window-header-bar') as HTMLElement;
//         if (handle) {
//           this.makeDraggable(lastWindow, handle);
//         }
//       }
//     }, 50);
//   }  

//   closeApp(appName: string): void {
//     this.openApps = this.openApps.filter(app => app.name !== appName);
//   }

//   isAppAlwaysUnlocked(app: string): boolean {
//     return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
//   }

//   isAppLocked(app: string): boolean {
//     return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
//   }

//   // logout(): void {
//   //   localStorage.removeItem('token');
//   //   this.isLoggedIn = false;
//   //   this.openApps = [{ name: 'welcome' }];
//   //   this.authService.logout();
//   //   this.router.navigate(['/']);
//   // }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.authService.logout();
  
//     // Clear all open apps and reset with just the welcome window
//     this.openApps = [{ name: 'welcome' }];
  
//     setTimeout(() => {
//       const welcomeWindow = document.querySelector('.floating-window') as HTMLElement;
//       const welcomeHandle = welcomeWindow?.querySelector('.window-header-bar') as HTMLElement;
//       if (welcomeWindow && welcomeHandle) {
//         this.makeDraggable(welcomeWindow, welcomeHandle);
//       }
//     }, 50);
//   }

//   handleStartClick(): void {
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }

//   getWindowClass(app: string): string {
//     switch (app) {
//       case 'quiz': return 'window-quiz';
//       case 'profile': return 'window-profile';
//       case 'results': return 'window-results';
//       case 'about': return 'window-about';
//       case 'feedback': return 'window-feedback';
//       case 'notes': return 'window-notes';
//       case 'register': return 'window-register';
//       case 'login': return 'window-login';
//       case 'welcome':
//       default: return 'window-default';
//     }
//   }

//   handleProfileOpen(userId: string): void {
//     this.openApp('viewProfile', userId);
//   }

//   reapplyDraggable(): void {
//     setTimeout(() => {
//       const headers = document.querySelectorAll('.window-header-bar');
//       const windows = document.querySelectorAll('.floating-window');
//       windows.forEach((win, i) => {
//         const handle = headers[i];
//         if (win && handle) {
//           this.makeDraggable(win as HTMLElement, handle as HTMLElement);
//         }
//       });
//     }, 50);
//   }

//   makeDraggable(elmnt: HTMLElement, handle: HTMLElement) {
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     const container = document.querySelector('.desktop-container') as HTMLElement;

//     handle.onmousedown = dragMouseDown;

//     function dragMouseDown(e: MouseEvent) {
//       e.preventDefault();
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//       document.onmousemove = elementDrag;
//     }

//     function elementDrag(e: MouseEvent) {
//       e.preventDefault();
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;

//       let newTop = elmnt.offsetTop - pos2;
//       let newLeft = elmnt.offsetLeft - pos1;

//       const maxTop = container.clientHeight - elmnt.clientHeight;
//       const maxLeft = container.clientWidth - elmnt.clientWidth;

//       newTop = Math.max(0, Math.min(newTop, maxTop));
//       newLeft = Math.max(0, Math.min(newLeft, maxLeft));

//       elmnt.style.top = `${newTop}px`;
//       elmnt.style.left = `${newLeft}px`;
//     }

//     function closeDragElement() {
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//   }
// }

// app.component.ts
// import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { AuthService } from './login/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   title = 'TigerTraits-deployed';

//   isLoggedIn: boolean = false;
//   currentTime: string = '';
//   zIndexCounter = 100;
//   openApps: any[] = [];

//   selectedProfileUserId: string | null = null;

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.checkLogin();
//     this.updateClock();
//     setInterval(() => this.updateClock(), 1000);

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.checkLogin();
//       }
//     });

//     // ⏱️ Show welcome window initially if not logged in
//     if (!this.isLoggedIn) {
//       this.openApps = [{ name: 'welcome', zIndex: this.zIndexCounter++ }];
//     }
//   }

//   ngAfterViewInit(): void {
//     this.attachDraggableToAllWindows();
//   }

//   updateClock(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }

//   checkLogin(): void {
//     const token = localStorage.getItem('token');
//     this.isLoggedIn = !!token;
//   }

//   openApp(app: string, data: any = null): void {
//     if (this.isLoggedIn || this.isAppAlwaysUnlocked(app)) {
//       if (app === 'viewProfile' && data) {
//         this.selectedProfileUserId = data.userId;
//       }

//       this.zIndexCounter++;
//       this.openApps.push({ name: app, data, zIndex: this.zIndexCounter });

//       // Allow time for DOM to render before attaching drag
//       setTimeout(() => this.attachDraggableToAllWindows(), 100);
//     }
//   }

//   closeApp(index: number): void {
//     this.openApps.splice(index, 1);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.authService.logout();
//     this.selectedProfileUserId = null;

//     // Reset to only welcome
//     this.openApps = [{ name: 'welcome', zIndex: this.zIndexCounter++ }];

//     // Reattach draggable after logout
//     setTimeout(() => this.attachDraggableToAllWindows(), 100);
//   }

//   isAppAlwaysUnlocked(app: string): boolean {
//     return ['welcome', 'about', 'notes', 'feedback', 'login', 'register'].includes(app);
//   }

//   isAppLocked(app: string): boolean {
//     return !this.isLoggedIn && !this.isAppAlwaysUnlocked(app);
//   }

//   handleStartClick(): void {
//     if (!this.isLoggedIn) {
//       this.openApp('welcome');
//     }
//   }

//   getWindowClass(app: string): string {
//     switch (app) {
//       case 'quiz':
//         return 'window-quiz';
//       case 'profile':
//         return 'window-profile';
//       case 'results':
//         return 'window-results';
//       case 'about':
//         return 'window-about';
//       case 'feedback':
//         return 'window-feedback';
//       case 'notes':
//         return 'window-notes';
//       case 'register':
//         return 'window-register';
//       case 'login':
//         return 'window-login';
//       case 'welcome':
//       default:
//         return 'window-default';
//     }
//   }

//   bringToFront(app: any): void {
//     this.zIndexCounter++;
//     app.zIndex = this.zIndexCounter;
//   }

//   handleProfileOpen(userId: string): void {
//     this.openApp('viewProfile', { userId });
//   }

//   attachDraggableToAllWindows(): void {
//     const windows = document.querySelectorAll('.floating-window');
//     windows.forEach(win => {
//       const header = win.querySelector('.window-header-bar') as HTMLElement;
//       if (header) this.makeDraggable(win as HTMLElement, header);
//     });
//   }

//   makeDraggable(elmnt: HTMLElement, handle: HTMLElement) {
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     const container = document.querySelector('.desktop-container') as HTMLElement;

//     handle.onmousedown = dragMouseDown;

//     function dragMouseDown(e: MouseEvent) {
//       e.preventDefault();
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//       document.onmousemove = elementDrag;
//     }

//     function elementDrag(e: MouseEvent) {
//       e.preventDefault();
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;

//       let newTop = elmnt.offsetTop - pos2;
//       let newLeft = elmnt.offsetLeft - pos1;

//       const maxTop = container.clientHeight - elmnt.offsetHeight;
//       const maxLeft = container.clientWidth - elmnt.offsetWidth;

//       newTop = Math.max(0, Math.min(newTop, maxTop));
//       newLeft = Math.max(0, Math.min(newLeft, maxLeft));

//       elmnt.style.top = `${newTop}px`;
//       elmnt.style.left = `${newLeft}px`;
//     }

//     function closeDragElement() {
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//   }
// }

// app.component.ts
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

    // default to welcome
    if (!this.isLoggedIn) {
      this.openApp('welcome');
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

  openApp(appName: string, data?: any): void {
    if (this.isLoggedIn || this.isAppAlwaysUnlocked(appName)) {
      const exists = this.openApps.find(app => app.name === appName && (!data || app.data === data));
      if (!exists) {
        this.zIndexCounter++;
        this.openApps.push({ name: appName, data, zIndex: this.zIndexCounter });
        setTimeout(() => this.reapplyDraggable(), 50);
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
  
      // Clear all current open windows
      this.openApps = [];
  
      // 🕒 Give Angular time to update `isLoggedIn` before opening new window
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

  handleStartClick(): void {
    if (!this.isLoggedIn) {
      this.openApp('welcome');
    }
  }

  getWindowClass(app: string): string {
    switch (app) {
      case 'quiz': return 'window-quiz';
      case 'profile': return 'window-profile';
      case 'results': return 'window-results';
      case 'about': return 'window-about';
      case 'feedback': return 'window-feedback';
      case 'notes': return 'window-notes';
      case 'register': return 'window-register';
      case 'login': return 'window-login';
      case 'welcome':
      default: return 'window-default';
    }
  }

  handleProfileOpen(userId: string): void {
    this.openApp('viewProfile', userId);
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

