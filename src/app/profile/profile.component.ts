// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent {

// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profileData: any = null;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     const userId = this.route.snapshot.paramMap.get('id');
//     this.http.get(`http://localhost:3000/profiles/${userId}`)
//       .subscribe({
//         next: (data) => this.profileData = data,
//         error: (err) => {
//           console.error('Failed to load profile:', err);
//           // fallback or redirect logic here
//         }
//       });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profileData: any = null;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     const userId = this.route.snapshot.paramMap.get('id');
//     this.http.get(`http://localhost:3000/profiles/${userId}`)
//       .subscribe({
//         next: (data) => this.profileData = data,
//         error: (err) => {
//           console.error('Failed to load profile:', err);
//         }
//       });
//   }
// }

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
      this.http.get(`http://localhost:3000/profiles/${this.userId}`).subscribe({
        next: (data) => this.profileData = data,
        error: (err) => console.error('Profile fetch error:', err)
      });
    }
  }
}

