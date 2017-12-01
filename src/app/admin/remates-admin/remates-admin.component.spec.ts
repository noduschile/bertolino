import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RematesAdminComponent } from './remates-admin.component';

describe('RematesAdminComponent', () => {
  let component: RematesAdminComponent;
  let fixture: ComponentFixture<RematesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RematesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RematesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
