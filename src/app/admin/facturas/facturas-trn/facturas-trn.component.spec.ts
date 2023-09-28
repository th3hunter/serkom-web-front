import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasTrnComponent } from './facturas-trn.component';

describe('FacturasTrnComponent', () => {
  let component: FacturasTrnComponent;
  let fixture: ComponentFixture<FacturasTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasTrnComponent]
    });
    fixture = TestBed.createComponent(FacturasTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
