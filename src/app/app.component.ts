import { Component } from '@angular/core';

// draft 3: using header component to route
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TigerTraits-deployed';

  isLoggedIn: boolean = false;

  onLoginSuccess(event: boolean) {
    this.isLoggedIn = event;
  }
}
