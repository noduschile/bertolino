import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadCardComponent } from './propiedad-card.component';

describe('PropiedadCardComponent', () => {
  let component: PropiedadCardComponent;
  let fixture: ComponentFixture<PropiedadCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiedadCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
