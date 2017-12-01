import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemateCardComponent } from './remate-card.component';

describe('RemateCardComponent', () => {
  let component: RemateCardComponent;
  let fixture: ComponentFixture<RemateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
