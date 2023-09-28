import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosTrnComponent } from './pagos-trn.component';

describe('PagosTrnComponent', () => {
  let component: PagosTrnComponent;
  let fixture: ComponentFixture<PagosTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosTrnComponent]
    });
    fixture = TestBed.createComponent(PagosTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
