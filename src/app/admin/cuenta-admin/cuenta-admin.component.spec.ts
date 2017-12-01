import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAdminComponent } from './cuenta-admin.component';

describe('CuentaAdminComponent', () => {
  let component: CuentaAdminComponent;
  let fixture: ComponentFixture<CuentaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
