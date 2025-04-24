import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
// export class InfoCardComponent {
//   @Input() personaName: string = '';
//   @Input() traits: string[] = [];
//   @Input() leftTags: string[] = [];
//   @Input() rightTags: string[] = [];
//   @Input() imageUrl: string = '';
//   @Input() resources: { name: string, link: string }[] = [];
//   @Input() compatibilities: { name: string, image: string, link: string }[] = [];
//   @Input() matchedUsers: any[] = [];
//   @Input() cardColor: string = '';
//   @Input() tagColor: string = '';

//   // 🔽 Add this function inside the class
//   getPersonaImage(type: string): string {
//     const personaImages: { [key: string]: string } = {
//       'INFP': "assets/personas/Truman's Paw.png",
//       'ENFJ': 'assets/personas/Shamrock.png',
//       'ENTP': "assets/personas/Speaker's Circle.png",
//       'INTJ': 'assets/personas/Columns.png',
//       'ISFJ': 'assets/personas/Squirrel.png',
//       'ESTJ': 'assets/personas/Kiss the Fifty.png',
//       // 🧩 Add more types and paths as you add more personas
//     };

//     return personaImages[type] || 'assets/personas/default.png';
//   }

//   getMatchedUserLink(type: string): string {
//     const user = this.matchedUsers.find(u => u.personalityType === type);
//     return user ? `/profile/${user.userId}` : `/profile/default`;
//   }  
// }

export class InfoCardComponent {
  @Input() personaName: string = '';
  @Input() traits: string[] = [];
  @Input() leftTags: string[] = [];
  @Input() rightTags: string[] = [];
  @Input() imageUrl: string = '';
  @Input() resources: { name: string, link: string }[] = [];
  @Input() compatibilities: { name: string, image: string, link: string }[] = [];
  @Input() matchedUsers: any[] = [];
  @Input() cardColor: string = '';
  @Input() tagColor: string = '';

  @Output() openProfile = new EventEmitter<string>(); // emit userId

  getPersonaImage(type: string): string {
    const personaImages: { [key: string]: string } = {
      'INFP': "assets/personas/Truman's Paw.png",
      'ENFJ': 'assets/personas/Shamrock.png',
      'ENTP': "assets/personas/Speaker's Circle.png",
      'INTJ': 'assets/personas/Columns.png',
      'ISFJ': 'assets/personas/Squirrel.png',
      'ESTJ': 'assets/personas/Kiss the Fifty.png'
    };

    return personaImages[type] || 'assets/personas/default.png';
  }

  handleProfileClick(userId: string): void {
    this.openProfile.emit(userId); // this gets forwarded to the parent component
  }
}
