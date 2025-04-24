import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @Output() openLogin = new EventEmitter<void>();

  proceedToForms() {
    this.openLogin.emit(); // tells AppComponent to switch to 'login'
  }
}
