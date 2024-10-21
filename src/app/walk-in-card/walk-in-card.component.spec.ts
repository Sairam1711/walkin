import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInCardComponent } from './walk-in-card.component';

describe('WalkInCardComponent', () => {
  let component: WalkInCardComponent;
  let fixture: ComponentFixture<WalkInCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkInCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
