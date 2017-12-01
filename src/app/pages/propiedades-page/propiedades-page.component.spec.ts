import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesPageComponent } from './propiedades-page.component';

describe('PropiedadesPageComponent', () => {
  let component: PropiedadesPageComponent;
  let fixture: ComponentFixture<PropiedadesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiedadesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
