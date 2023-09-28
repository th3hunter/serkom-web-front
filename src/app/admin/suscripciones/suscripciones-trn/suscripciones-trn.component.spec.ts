import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesTrnComponent } from './suscripciones-trn.component';

describe('SuscripcionesTrnComponent', () => {
  let component: SuscripcionesTrnComponent;
  let fixture: ComponentFixture<SuscripcionesTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuscripcionesTrnComponent]
    });
    fixture = TestBed.createComponent(SuscripcionesTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
