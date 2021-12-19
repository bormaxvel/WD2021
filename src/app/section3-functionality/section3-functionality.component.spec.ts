import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section3FunctionalityComponent } from './section3-functionality.component';

describe('Section3FunctionalityComponent', () => {
  let component: Section3FunctionalityComponent;
  let fixture: ComponentFixture<Section3FunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section3FunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Section3FunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
