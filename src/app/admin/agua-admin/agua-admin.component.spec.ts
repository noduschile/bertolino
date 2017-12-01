import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaAdminComponent } from './agua-admin.component';

describe('AguaAdminComponent', () => {
  let component: AguaAdminComponent;
  let fixture: ComponentFixture<AguaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AguaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AguaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
