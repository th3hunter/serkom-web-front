import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPanComponent } from './pagos-pan.component';

describe('PagosPanComponent', () => {
  let component: PagosPanComponent;
  let fixture: ComponentFixture<PagosPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosPanComponent]
    });
    fixture = TestBed.createComponent(PagosPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
