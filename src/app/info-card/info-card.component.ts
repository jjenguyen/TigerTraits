import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() personaName: string = '';
  @Input() traits: string[] = [];
  @Input() leftTags: string[] = [];
  @Input() rightTags: string[] = [];
  @Input() imageUrl: string = '';
  @Input() resources: { name: string, link: string }[] = [];
  @Input() compatibilities: { name: string, image: string, link: string }[] = [];
  @Input() cardColor: string = '';
  @Input() tagColor: string = '';
}
