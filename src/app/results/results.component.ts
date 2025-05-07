import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { infoCards, InfoCard } from '../models/infocard';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  card: InfoCard | null = null;
  @Output() openProfile = new EventEmitter<string>();
  confirmingDelete = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    const userType = currentUser?.personalityType;
    const userId = currentUser?.userId;

    if (userType && infoCards[userType]) {
      // Start with static info
      this.card = { ...infoCards[userType], compatibilities: [] };

      // Fetch dynamic compatibility data
      this.http.post('/compatibilities', {
        userId: userId,
        resultType: userType
      }).subscribe((res: any) => {
        const matched = res?.data?.matchedUsers || [];

        // Safely update only compatibilities
        if (this.card) {
          this.card.compatibilities = matched;
        }
      });
    }
  }

  viewUser(userId: string): void {
    this.openProfile.emit(userId);
  }

  showConfirmDelete() {
    this.confirmingDelete = true;
  }

  cancelDelete() {
    this.confirmingDelete = false;
  }

  confirmAccountDelete() {
    this.authService.deleteAccount().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/welcome']).then(() => location.reload());
        }, 1000);
      },
      error: (err) => {
        console.error('Account deletion failed:', err);
      }
    });
  }
}
