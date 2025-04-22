import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private authService: AuthService){}

  userProfile: any;
  currentUser:any;
  editMode: boolean = false;
    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();  // Get the current user from the auth service
      console.log("Current user:", this.currentUser);

      this.profileService.getProfile(this.currentUser.userId).subscribe({
        next: (profile) => {

          if (profile) {
            this.userProfile = profile;
            console.log('Profile loaded:', this.userProfile);
          } else {
            // If no profile is found, create a new one
            this.createNewProfile();
          }
        },
        error: (err) => {
          // Check for a 404 error to create the profile
          console.log("current user is ", this.currentUser.userId);
          console.error('Error loading profile:', err);
        }
      });
    }

    private createNewProfile() {
      const newProfile = {
        userId: this.currentUser.userId,
        name: '',
        bio: '',
        picture: '',
        socials: '',
        personalityType: ''
      };
      this.profileService.createProfile(newProfile).subscribe({
        next: (profile) => {
          console.log('Profile created:', profile);
          this.userProfile = profile;
        },
        error: (err) => {
          console.error('Error creating profile:', err);
        }
      });
    }



toggleEdit(){
  this.editMode = !this.editMode;
}
//save changes to profile
saveEdits(){
  this.editMode = false;
  const currentUser = this.authService.getCurrentUser();
  this.profileService.updateProfile(currentUser.userId, this.userProfile).subscribe(
    (response) => {
      console.log('Profile updated:', response);
      ;
    },
    (error) => {
      console.error('Error updating profile:', error);
    }
  );

  // send the edited profile data to the profile service to update db

}
}



