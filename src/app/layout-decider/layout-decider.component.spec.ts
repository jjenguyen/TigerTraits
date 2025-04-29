import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDeciderComponent } from './layout-decider.component';

describe('LayoutDeciderComponent', () => {
  let component: LayoutDeciderComponent;
  let fixture: ComponentFixture<LayoutDeciderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutDeciderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutDeciderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
