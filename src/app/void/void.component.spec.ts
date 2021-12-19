import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VOIDComponent } from './void.component';

describe('VOIDComponent', () => {
  let component: VOIDComponent;
  let fixture: ComponentFixture<VOIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VOIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VOIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
