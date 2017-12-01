import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineraCardComponent } from './minera-card.component';

describe('MineraCardComponent', () => {
  let component: MineraCardComponent;
  let fixture: ComponentFixture<MineraCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineraCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
