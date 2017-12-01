import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaPageComponent } from './agua-page.component';

describe('AguaPageComponent', () => {
  let component: AguaPageComponent;
  let fixture: ComponentFixture<AguaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AguaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AguaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
