import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  initialContactInfo: any = {};
  isEditing = false;
  contactCard: any;
  user: any;



  contactForm = this.fb.group({
    name: ['', Validators.required],
    bio: ['', Validators.required],
    imageUrl: [''],
    instagram: [''],
    facebook: [''],
    linkedIn: [''],
    tigerTrait: [{value:'', disabled: true}]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private contactService: ContactService) {
    this.user = this.authService.getCurrentUser();
    //if contact Card exists, get contact info from the db
    if(this.user){
      this.contactForm.patchValue({
        name: this.user.name || '',
        bio: this.user.bio || '',
        imageUrl: this.user.imageUrl || '',
        instagram: this.user.instagram || '',
        facebook: this.user.facebook || '',
        linkedIn: this.user.linkedin || ''
      });
    }
    //default empty values
    else{
      // Initialize the form with default values
      this.contactForm.patchValue({
        tigerTrait: 'Truman’s Paw'
      });
    }

  }

  ngOnInit():void {
    console.log('[DEBUG] ngOnInit triggered');
    if (!this.user || !this.user.id) {
      console.error('User or user ID is undefined.');
      return;
    }
    this.contactService.getContactCard(this.user.id).subscribe(info =>{
      console.log("Loader contact card: ", info)
      this.contactForm.patchValue({
        name: info.name || '',
        bio: info.bio || '',
        imageUrl: info.imageUrl || '',
        instagram: info.instagram || '',
        facebook: info.facebook || '',
        linkedIn: info.linkedIn || '',
        tigerTrait: info.tigerTrait || 'Truman’s Paw'
      });
    },
    (err) => {
      console.error('Error loading contact info:', err);
      console.error("[DEBUG] user ID: ", this.user.id);
    });

}


/*
  loadUserContactInfo(){
    const userId = this.authService.getUserId(); //
    if (!userId) return;

    this.contactService.getContactCard(userId).subscribe({
      next: (data) => {
        console.log('[DEBUG] profile data from DB:', data);
        this.initialContactInfo = {
          name: data.name || '',
          bio: data.bio || '',
          imageUrl: data.imageUrl || '',
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          linkedIn: data.linkedin || '',
          tigerTrait: data.tigerTrait || 'Truman’s Paw'
        };
        this.contactForm.patchValue(this.initialContactInfo);
      },
      error: (err) => {
        console.error('Failed to load contact info:', err);
      }
    });
*/
    /*const user = this.authService.getCurrentUser();

    //if user is logged in, get contact info from the db
    if(user){
      this.initialContactInfo = {
        name: user.name || '',
        bio: user.bio || '',
        imageUrl: user.imageUrl || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        linkedin: user.linkedin || '',
        tigerTrait: user.tigerTrait || 'Truman’s Paw'
      }
      this.contactForm.patchValue(this.initialContactInfo);
    }*/
  //}

  enableEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.contactForm.reset(this.initialContactInfo);
  }

  saveContactInfo(){
    console.log('Save button clicked!');
    if (this.contactForm.valid) {
      const updatedContactInfo = this.contactForm.getRawValue();

      this.contactService.updateContactCard(updatedContactInfo).subscribe({
        next: (response) => {
          console.log('Contact info updated successfully:', response);
          this.isEditing = false;
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
}
