import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesPanComponent } from './suscripciones-pan.component';

describe('SuscripcionesPanComponent', () => {
  let component: SuscripcionesPanComponent;
  let fixture: ComponentFixture<SuscripcionesPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuscripcionesPanComponent]
    });
    fixture = TestBed.createComponent(SuscripcionesPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
