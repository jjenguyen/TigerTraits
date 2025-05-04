import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() userId: string = '';
  profileData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.userId) {
      console.log('[DEBUG] Fetching profile data for user ID:', this.userId);
      // http://localhost:3000/profiles/${this.userId}
      this.http.get(`/profiles/${this.userId}`).subscribe({
        next: (data) => this.profileData = data,
        error: (err) => console.error('Profile fetch error:', err)
      });
    }
  }
}
