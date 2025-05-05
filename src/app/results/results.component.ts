import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { AuthService }    from '../login/auth.service';
//pull info cards from models for easy access
import { infoCards, InfoCard } from '../models/infocard';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent implements OnInit {
  //allow null info card results for newly registered users  (*ngIf="card; else noCard")
  card: InfoCard | null = null;

  constructor(private router: Router, private authService: AuthService
  ) {}

  confirmingDelete = false;

  ngOnInit() {
    //get the current user object from authservice and access pType
    const currentUser = this.authService.getCurrentUser();
    //console.log("Current user:", currentUser);
    const userType = currentUser.personalityType;
  
    //userType isn't null and the type matches one from the cards model
    if (userType && infoCards[userType]) {
      //pull from the infocard model and assign to card to populate 
      this.card = infoCards[userType];
    } 
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
          this.router.navigate(['/welcome']).then(() => {
            location.reload(); 
          });
        }, 1000);
      },
      error: (err) => {
        console.error('Account deletion failed:', err);
      }
    });
  }

}
