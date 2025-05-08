// import { Component, OnInit }    from '@angular/core';
// import { Router }               from '@angular/router';
// import { AuthService }    from '../login/auth.service';
// //pull info cards from models for easy access
// import { infoCards, InfoCard } from '../models/infocard';

// @Component({
//   selector: 'app-results',
//   templateUrl: './results.component.html',
//   styleUrl: './results.component.css'
// })

// export class ResultsComponent implements OnInit {
//   //allow null info card results for newly registered users  (*ngIf="card; else noCard")
//   card: InfoCard | null = null;

//   constructor(private router: Router, private authService: AuthService
//   ) {}

//   confirmingDelete = false;

//   ngOnInit() {
//     //get the current user object from authservice and access pType
//     const currentUser = this.authService.getCurrentUser();
//     //console.log("Current user:", currentUser);
//     const userType = currentUser.personalityType;
  
//     //userType isn't null and the type matches one from the cards model
//     if (userType && infoCards[userType]) {
//       //pull from the infocard model and assign to card to populate 
//       this.card = infoCards[userType];
//     } 
//   }

//   showConfirmDelete() {
//     this.confirmingDelete = true;
//   }

//   cancelDelete() {
//     this.confirmingDelete = false;
//   }

//   confirmAccountDelete() {
//     this.authService.deleteAccount().subscribe({
//       next: () => {
//         localStorage.removeItem('token');
//         this.authService.logout();
//         setTimeout(() => {
//           this.router.navigate(['/welcome']).then(() => {
//             location.reload(); 
//           });
//         }, 1000);
//       },
//       error: (err) => {
//         console.error('Account deletion failed:', err);
//       }
//     });
//   }

// }

// NEW CODE - testing comp list feature logic
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { QuizService } from '../quiz/quiz.service';
//pull info cards from models for easy access
import { infoCards, InfoCard } from '../models/infocard';
import { ContactService } from "../contact/contact.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent implements OnInit {
  //allow null info card results for newly registered users  (*ngIf="card; else noCard")
  card: InfoCard | null = null;
  compatibilities: any[] = []; // array to hold compatible users

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService,
    private contactService: ContactService
  ) {}

  confirmingDelete = false;

  ngOnInit() {
    // get the current user object from AuthService and access personality type
    const currentUser = this.authService.getCurrentUser();
    //console.log("Current user:", currentUser);
    const userType = currentUser?.personalityType;
  
    // if userType isn't null and matches one from the cards model, assign it to 'card'
    if (userType && infoCards[userType]) {
      this.card = infoCards[userType];
    }

    // fetch compatibility data if user is logged in
    if (currentUser) {
      this.getCompatibilities(currentUser.id);
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

  // NEW CODE, DRAFT 1 - fetches the compatibility list from the server
  // getCompatibilities(userId: string): void {
  //   this.quizService.getCompatibilities(userId).subscribe({
  //     next: (response) => {
  //       console.log('Compatibilities fetched:', response);
  //       // Ensure compatibility list is properly initialized as an array
  //       this.compatibilities = response?.data || [];
  //     },
  //     error: (err) => {
  //       console.error('Error fetching compatibilities:', err);
  //       // Fallback to an empty array in case of error
  //       this.compatibilities = [];
  //     }
  //   });
  // }
  // NEW CODE, DRAFT 2 - fetches the compatibility list and loads user names from contact cards
  getCompatibilities(userId: string): void {
    this.quizService.getCompatibilities(userId).subscribe({
      next: (response) => {
        console.log('Compatibilities fetched:', response);
        const compatList = response?.data || [];
        this.compatibilities = [];

        // fetch the name for each compatibility
        compatList.forEach((compat) => {
          this.contactService.getContactCard(compat.userId).subscribe({
            next: (contactInfo) => {
              compat.name = contactInfo?.name || 'Unknown User';
              this.compatibilities.push(compat);
              console.log('Updated compatibility:', compat);
            },
            error: (err) => {
              console.error('Error fetching contact name:', err);
              compat.name = 'Unknown User';
              this.compatibilities.push(compat);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching compatibilities:', err);
        this.compatibilities = [];
      }
    });
  }


  // FIX - need to use openApp to return back to quiz start
  // method to start the quiz again
  startQuizAgain(): void {
    this.router.navigate(['/quiz']);
  }

  // method to open a profile when clicked
  openProfile(userId: string): void {
    window.dispatchEvent(new CustomEvent('openApp', { detail: { appName: 'contact', data: userId } }));
  }  
}
