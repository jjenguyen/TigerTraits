// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators} from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../login/auth.service';
// // importing the mobile layout and made the desktop layout not render bc of the way it was used, so i commented the references out
// // import { MobileLayoutComponent } from '../mobile-layout/mobile-layout.component';
// import { ContactService } from './contact.service';
// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css']
// })
// export class ContactComponent implements OnInit {
//   imagePath: string = '';
//   personality: string = '';
//   hasPersonality: boolean | null = null;

//   initialContactInfo: any = {};
//   isEditing = false;
//   contactCard: any;
//   user: any;
//   imagePreview: string | null;

//   contactForm = this.fb.group({
//     name: ['', Validators.required],
//     bio: ['', Validators.required],
//     //removed {validators: [Validators.required]}
//     imageUrl: [null as string | File | null],
//     instagram: [''],
//     facebook: [''],
//     linkedin: [''],
//     tigerTrait: [{value:'', disabled: true}]
//   });

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     // private mobileLayout: MobileLayoutComponent,
//     private fb: FormBuilder,
//     private contactService: ContactService
//   ) {
//     this.user = this.authService.getCurrentUser();
//     //if contact Card exists, get contact info from the db
//     if(this.user){
//       this.contactForm.patchValue({
//         name: this.user.name || '',
//         bio: this.user.bio || '',
//         imageUrl: this.user.imageUrl || '',
//         instagram: this.user.instagram || '',
//         facebook: this.user.facebook || '',
//         linkedin: this.user.linkedin || ''
//       });
//     }
//     //default empty values
//     else{
//       // Initialize the form with default values
//       this.contactForm.patchValue({
//         //Truman's Paw is default value until we can link MBTI quiz result
//         tigerTrait: 'ENFP'
//       });
//     }

//   }

//   ngOnInit(): void {
//     //get current user form AuthService
//     //let currentUser = this.authService.getCurrentUser();

//     console.log('[DEBUG] ngOnInit triggered');
//     if (!this.user || !this.user.id) {
//       console.error('User or user ID is undefined.');
//       return;
//     }
//     //NEED TO ADD a loader until html is fully rendered
//     this.contactService.getContactCard(this.user.id).subscribe(info =>{
//       console.log("Loader contact card: ", info)
//       //save info to initialContactInfo
//       this.initialContactInfo = { ...info };
//       this.contactForm.patchValue({
//         name: info.name || '',
//         bio: info.bio || '',
//         imageUrl: info.imageUrl || '',
//         instagram: info.instagram || '',
//         facebook: info.facebook || '',
//         linkedin: info.linkedin || '',
//         tigerTrait: info.tigerTrait || 'ENFP'
//       });
//       // Set the imagePreview to the current imageUrl
//       this.imagePreview = info.imageUrl || '';
//       console.log('[DEBUG] imageUrl after loading contact card:', this.contactForm.get('imageUrl')?.value);
//     },
//     (err) => {
//       console.error('Error loading contact info:', err);
//       console.error("[DEBUG] user ID: ", this.user.id);
//     });

//     // If AuthService hasn't loaded the user yet, fall back to localStorage
//     if (!this.user) {
//       const stored = localStorage.getItem('currentUser');
//       if (stored) {
//         this.user = JSON.parse(stored);
//         console.log('[Fallback] Loaded user from localStorage:', this.user);
//         this.authService.setCurrentUser(this.user); // sync back with Authservice
//       }
//     }

//     // get user id to use in API call
//     const userId = this.user?.id;

//     // Fetch personality type of user
//     if (userId) {
//       this.contactService.getPersonality(userId).subscribe({
//         next: (res) => {
//           if (res?.personality) {
//             this.personality = res.personality;
//             this.imagePath = `assets/personas/${res.personality}.png`;
//             this.hasPersonality = true;
//           } else {
//             this.hasPersonality = false;
//           }
//         },
//         error: (err) => {
//           console.error('Failed to fetch personality:', err);
//           this.hasPersonality = false;
//         }
//       });
//     } else {
//       console.warn('No user ID found, cannot fetch personality');
//       this.hasPersonality = false;
//     }
//   }

//   onImagePicked(event: Event) {
//     const fileInput = event.target as HTMLInputElement;
//     const file = fileInput.files?.[0];
//     if (file) {

//       const formData = new FormData();
//       formData.append('image', file);

//       this.contactService.uploadImage(formData).subscribe({
//         next: (response: any) => {
//           console.log('File upload response:', response);
//           if (response.imageUrl) {
//             this.contactForm.patchValue({ imageUrl: response.imageUrl }); // Update the form with the uploaded image URL
//             //update preview
//             this.imagePreview = response.imageUrl;
//             console.log('Image preview URL:', response.imageUrl);
//           }else{
//             console.error('Error: imageUrl is missing in the response.');
//           }
//           fileInput.value = '';
//         },
//         error: (err) => {
//           console.error('Error uploading file:', err);
//           fileInput.value = '';
//         }
//       });
//     }
//   }

//     enableEditing() {
//       this.isEditing = true;
//     }

//     cancelEditing() {
//       this.isEditing = false;
//       // Reset the form to the original values

//     }

//     saveContactInfo(){
//       console.log('Save button clicked!');
//       if (this.contactForm.valid) {
//         const updatedContactInfo = this.contactForm.getRawValue();

//         // Preserve the existing imageUrl if no new photo is uploaded
//       if (!updatedContactInfo.imageUrl || updatedContactInfo.imageUrl === '') {
//         updatedContactInfo.imageUrl = this.initialContactInfo.imageUrl;
//       }

//         this.contactService.updateContactCard(updatedContactInfo).subscribe({
//           next: (response) => {
//             console.log('Contact info updated successfully:', response);
//             this.isEditing = false;
//             //update initialContactInfo
//             this.initialContactInfo = { ...updatedContactInfo };
//           },
//           error: (error) => {

//             console.error('Error updating contact info:', error);
//           }

//         });
//       }
//       else {
//         console.warn('Form is invalid! Current form values:', this.contactForm.value);
//         console.warn('Form errors:', this.contactForm.errors);
//       }
//     }

//   goToQuiz(): void {
//     console.log('Quiz button clicked');
//     // dispatch a custom event for both desktop and mobile layouts to nav user to take the quiz
//     window.dispatchEvent(new CustomEvent('openApp', { detail: 'quiz' }));
//   }
  
//   // bio character counter
//   charCount: number = 0;
//   updateCharacterCount(event: Event): void {
//     const target = event.target as HTMLTextAreaElement;
//     this.charCount = target.value.length;
//   }
// }

// NEW CODE - testing comp list feature logic
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() userId: string = '';  // input to receive user ID

  imagePath: string = '';
  personality: string = '';
  hasPersonality: boolean | null = null;

  initialContactInfo: any = {};
  isEditing = false;
  contactCard: any;
  user: any;
  imagePreview: string | null;
  isOwnProfile: boolean = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    bio: ['', Validators.required],
    imageUrl: [null as string | File | null],
    instagram: [''],
    facebook: [''],
    linkedin: [''],
    tigerTrait: [{ value: '', disabled: true }]
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

ngOnInit(): void {
  console.log('[DEBUG] ngOnInit triggered');

  // check if the userId was passed as an input (from compatibility click)
  if (!this.userId) {
    const currentUser = this.authService.getCurrentUser();
    this.userId = currentUser?.id || '';
  }

  // log the user ID being used to load the profile
  console.log('[DEBUG] Loaded User ID:', this.userId);

  // if (this.userId) {
  //   this.loadContactCard(this.userId);
  // } else {
  //   console.warn('No user ID provided for contact card.');
  // }
  if (this.userId) {
    this.loadContactCard(this.userId);
    // check if the loaded profile belongs to the logged-in user
    const currentUser = this.authService.getCurrentUser();
    this.isOwnProfile = currentUser?.id === this.userId;
    console.log('[DEBUG] Is Own Profile:', this.isOwnProfile);
  } else {
    console.warn('No user ID provided for contact card.');
  }
}

// NEW!!!
loadContactCard(userId: string): void {
  this.contactService.getContactCard(userId).subscribe({
    next: (info) => {
      this.contactCard = info;
      this.initialContactInfo = { ...info };
      console.log('Contact card loaded:', info);
      this.contactForm.patchValue({
        name: info.name || '',
        bio: info.bio || '',
        imageUrl: info.imageUrl || '',
        instagram: info.instagram || '',
        facebook: info.facebook || '',
        linkedin: info.linkedin || '',
        tigerTrait: info.tigerTrait || ''
      });
      this.imagePreview = info.imageUrl || '';

      // fetch personality type and set the image path
      this.contactService.getPersonality(userId).subscribe({
        next: (res) => {
          if (res?.personality) {
            this.personality = res.personality;
            this.imagePath = `assets/personas/${res.personality}.png`;
            this.hasPersonality = true;
          } else {
            this.hasPersonality = false;
          }
        },
        error: (err) => {
          console.error('Failed to fetch personality:', err);
          this.hasPersonality = false;
        }
      });
    },
    error: (err) => {
      console.error('Error loading contact info:', err);
    }
  });
}

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      this.contactService.uploadImage(formData).subscribe({
        next: (response: any) => {
          if (response.imageUrl) {
            this.contactForm.patchValue({ imageUrl: response.imageUrl });
            this.imagePreview = response.imageUrl;
            console.log('Image uploaded:', response.imageUrl);
          } else {
            console.error('Image URL missing in the response.');
          }
          fileInput.value = '';
        },
        error: (err) => {
          console.error('Error uploading file:', err);
          fileInput.value = '';
        }
      });
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveContactInfo() {
    if (this.contactForm.valid) {
      const updatedContactInfo = this.contactForm.getRawValue();

      // preserve existing imageUrl if no new photo is uploaded
      if (!updatedContactInfo.imageUrl || updatedContactInfo.imageUrl === '') {
        updatedContactInfo.imageUrl = this.initialContactInfo.imageUrl;
      }

      this.contactService.updateContactCard(updatedContactInfo).subscribe({
        next: (response) => {
          this.isEditing = false;
          this.initialContactInfo = { ...updatedContactInfo };
          console.log('Contact info updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating contact info:', error);
        }
      });
    } else {
      console.warn('Form is invalid! Current form values:', this.contactForm.value);
    }
  }

  goToQuiz(): void {
    console.log('Quiz button clicked');
    window.dispatchEvent(new CustomEvent('openApp', { detail: 'quiz' }));
  }

  // character counter for bio field
  charCount: number = 0;
  updateCharacterCount(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.charCount = target.value.length;
  }
}
