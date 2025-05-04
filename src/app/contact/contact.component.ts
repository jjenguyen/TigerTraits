import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { MobileLayoutComponent } from '../mobile-layout/mobile-layout.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  imagePath: string = '';
  personality: string = '';
  hasPersonality: boolean = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private mobileLayout: MobileLayoutComponent  // inject mobile layout
  ) {}

  ngOnInit(): void {
    //get current user form AuthService
    let currentUser = this.authService.getCurrentUser();
    
    // If AuthService hasn't loaded the user yet, fall back to localStorage
    if (!currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        currentUser = JSON.parse(stored);
        console.log('[Fallback] Loaded user from localStorage:', currentUser);
        this.authService.setCurrentUser(currentUser); // sync back with Authservice
      }
    }
  
    // get user id to use in API call
    const userId = currentUser?.id;
  
    // Fetch personality type of user
    if (userId) {
      this.http.get<{ personality: string }>(`http://localhost:3000/api/user/${userId}/personality`)
        .subscribe({
          next: (res) => {
            // update state if personality is returned
            if (res?.personality) {
              this.personality = res.personality;
              this.imagePath = `assets/personas/${res.personality}.png`;
              this.hasPersonality = true;
            } else {
              // if no personality found, user has not taken quiz
              this.hasPersonality = false;
            }
          },
          error: (err) => {
            console.error('Failed to fetch personality:', err);
            this.hasPersonality = false;
          }
        });
    } else {
      console.warn('No user ID found, cannot fetch personality');
      this.hasPersonality = false;
    }
  }

  goToQuiz(): void {
    console.log('Quiz button clicked');
    this.mobileLayout.switchScreen('quiz'); // trigger screen change
  }
}