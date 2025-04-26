import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-decider',
  templateUrl: './layout-decider.component.html',
  styleUrl: './layout-decider.component.css'
})
export class LayoutDeciderComponent implements OnInit {
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    console.log('[LayoutDecider] Initial size:', window.innerWidth, window.innerHeight);
  }
  
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1125 || window.innerHeight < 800;
    console.log('[LayoutDecider] isMobile =', this.isMobile);
  }  
}
