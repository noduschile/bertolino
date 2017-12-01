import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaCardComponent } from './agua-card.component';

describe('AguaCardComponent', () => {
  let component: AguaCardComponent;
  let fixture: ComponentFixture<AguaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AguaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AguaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
