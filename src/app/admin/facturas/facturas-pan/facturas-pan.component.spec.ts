import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasPanComponent } from './facturas-pan.component';

describe('FacturasPanComponent', () => {
  let component: FacturasPanComponent;
  let fixture: ComponentFixture<FacturasPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasPanComponent]
    });
    fixture = TestBed.createComponent(FacturasPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
