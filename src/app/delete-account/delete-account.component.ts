import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  deleting = false;
  deleted = false;

  constructor(private authService: AuthService, private router: Router) {}

  confirmDelete() {
    this.deleting = true;

    this.authService.deleteAccount().subscribe({
      next: () => {
        setTimeout(() => {
          this.deleting = false;
          this.deleted = true;
          localStorage.removeItem('token');
          this.authService.logout();
    
          // Redirect after 1.5s pause
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              location.reload(); // forces full state reset and shows welcome
            });
          }, 1500);
        }, 2000);
      },
      error: err => {
        console.error('Error deleting:', err);
        this.deleting = false;
      }
    });
  }
}
