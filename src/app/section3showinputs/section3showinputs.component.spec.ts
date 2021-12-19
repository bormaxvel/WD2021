import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section3showinputsComponent } from './section3showinputs.component';

describe('Section3showinputsComponent', () => {
  let component: Section3showinputsComponent;
  let fixture: ComponentFixture<Section3showinputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section3showinputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Section3showinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
