import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  initialContactInfo: any = {};
  isEditing = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    bio: ['', [Validators.required, Validators.required]],
    imageUrl: [''],
    instagram: [''],
    facebook: [''],
    linkedIn: [''],
    tigerTrait: [{value:'', disabled: true}]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private contactService: ContactService) {
    // Initialize the form with default values
    this.contactForm.patchValue({
      tigerTrait: 'Truman’s Paw'
    });
  }

  ngOnInit(){
    this.loadUserContactInfo();
  }

  loadUserContactInfo(){
    const user = this.authService.getCurrentUser();

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
    }
  }

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
