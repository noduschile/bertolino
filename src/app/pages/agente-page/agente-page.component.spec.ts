import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentePageComponent } from './agente-page.component';

describe('AgentePageComponent', () => {
  let component: AgentePageComponent;
  let fixture: ComponentFixture<AgentePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
