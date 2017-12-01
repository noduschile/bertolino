import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineraAdminComponent } from './minera-admin.component';

describe('MineraAdminComponent', () => {
  let component: MineraAdminComponent;
  let fixture: ComponentFixture<MineraAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineraAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineraAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
