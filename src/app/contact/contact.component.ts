import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { MobileLayoutComponent } from '../mobile-layout/mobile-layout.component';
import { ContactService } from './contact.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})



export class ContactComponent implements OnInit, OnChanges{
  @Input() userId?: string;
  imagePath: string = '';
  personality: string = '';
  hasPersonality: boolean = true;

  initialContactInfo: any = {};
  isEditing = false;
  contactCard: any;
  user: any;
  imagePreview: string | null;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    bio: ['', Validators.required],
    //add asyncValidators: [mimeType]
    imageUrl: [null as string | File | null, {validators: [Validators.required]}],
    instagram: [''],
    facebook: [''],
    linkedin: [''],
    tigerTrait: [{value:'', disabled: true}]
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private mobileLayout: MobileLayoutComponent,  // inject mobile layout
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {
    this.user = this.authService.getCurrentUser();
    //if contact Card exists, get contact info from the db

  }

  ngOnInit(): void {
    this.loadContactCard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      setTimeout(() => this.loadContactCard(), 0);
    }
  }

  private loadContactCard(): void {
    const fallbackUser = this.authService.getCurrentUser();
    const userIdToLoad = this.userId || fallbackUser?.id;

    if (!userIdToLoad) {
      console.error('No user ID available.');
      return;
    }

    this.isEditing = !this.userId;

    this.contactService.getContactCard(userIdToLoad).subscribe(info => {
      this.initialContactInfo = { ...info };
      this.contactForm.patchValue({
        name: info.name || '',
        bio: info.bio || '',
        imageUrl: info.imageUrl || '',
        instagram: info.instagram || '',
        facebook: info.facebook || '',
        linkedin: info.linkedin || '',
        tigerTrait: info.tigerTrait || 'Truman’s Paw'
      });
      this.imagePreview = info.imageUrl || '';
    });

    this.http.get<{ personality: string }>(`http://localhost:3000/api/user/${userIdToLoad}/personality`)
      .subscribe({
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
  }
  
  
  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {

      const formData = new FormData();
      formData.append('image', file);

      this.contactService.uploadImage(formData).subscribe({
        next: (response: any) => {
          console.log('File upload response:', response);
          if (response.imageUrl) {
            this.contactForm.patchValue({ imageUrl: response.imageUrl }); // Update the form with the uploaded image URL
            //update preview
            this.imagePreview = response.imageUrl;
            console.log('Image preview URL:', response.imageUrl);
          }else{
            console.error('Error: imageUrl is missing in the response.');
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
      // Reset the form to the original values

    }

    saveContactInfo(){
      console.log('Save button clicked!');
      if (this.contactForm.valid) {
        const updatedContactInfo = this.contactForm.getRawValue();

        // Preserve the existing imageUrl if no new photo is uploaded
      if (!updatedContactInfo.imageUrl || updatedContactInfo.imageUrl === '') {
        updatedContactInfo.imageUrl = this.initialContactInfo.imageUrl;
      }

        this.contactService.updateContactCard(updatedContactInfo).subscribe({
          next: (response) => {
            console.log('Contact info updated successfully:', response);
            this.isEditing = false;
            //update initialContactInfo
            this.initialContactInfo = { ...updatedContactInfo };
          },
          error: (error) => {

            console.error('Error updating contact info:', error);
          }

        });
      }
      else {
        console.warn('Form is invalid! Current form values:', this.contactForm.value);
        console.warn('Form errors:', this.contactForm.errors);
      }
    }

  goToQuiz(): void {
    console.log('Quiz button clicked');
    this.mobileLayout.switchScreen('quiz'); // trigger screen change
  }
}
