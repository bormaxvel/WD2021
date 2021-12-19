import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2CardsComponent } from './section2-cards.component';

describe('Section2CardsComponent', () => {
  let component: Section2CardsComponent;
  let fixture: ComponentFixture<Section2CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Section2CardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Section2CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
