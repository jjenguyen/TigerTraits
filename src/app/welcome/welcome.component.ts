// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-welcome',
//   templateUrl: './welcome.component.html',
//   styleUrl: './welcome.component.css'
// })
// export class WelcomeComponent {
//   constructor(private router: Router) {} // inject the router

//   proceedToForms() {
//     // navs user to login/register page
//     this.router.navigate(['/login']);
//   }
// }

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] // note the correct plural: styleUrls
})
export class WelcomeComponent {
  @Output() openLogin = new EventEmitter<void>();

  proceedToForms() {
    this.openLogin.emit(); // tells AppComponent to switch to 'login'
  }
}
