import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineraPageComponent } from './minera-page.component';

describe('MineraPageComponent', () => {
  let component: MineraPageComponent;
  let fixture: ComponentFixture<MineraPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineraPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
