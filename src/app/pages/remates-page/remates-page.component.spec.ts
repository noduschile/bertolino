import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RematesPageComponent } from './remates-page.component';

describe('RematesPageComponent', () => {
  let component: RematesPageComponent;
  let fixture: ComponentFixture<RematesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RematesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RematesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
