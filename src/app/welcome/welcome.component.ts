import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @Output() openLogin = new EventEmitter<void>();
  isMobileLayout: boolean = false;

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth < 1125 || window.innerHeight < 800;
  }

  proceedToForms() {
    this.openLogin.emit(); // tells AppComponent to switch to 'login'
  }
}
