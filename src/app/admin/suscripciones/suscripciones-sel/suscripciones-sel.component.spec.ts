import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesSelComponent } from './suscripciones-sel.component';

describe('SuscripcionesSelComponent', () => {
  let component: SuscripcionesSelComponent;
  let fixture: ComponentFixture<SuscripcionesSelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuscripcionesSelComponent]
    });
    fixture = TestBed.createComponent(SuscripcionesSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
