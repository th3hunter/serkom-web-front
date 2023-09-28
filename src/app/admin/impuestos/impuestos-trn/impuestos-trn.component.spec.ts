import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosTrnComponent } from './impuestos-trn.component';

describe('ImpuestosTrnComponent', () => {
  let component: ImpuestosTrnComponent;
  let fixture: ComponentFixture<ImpuestosTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpuestosTrnComponent]
    });
    fixture = TestBed.createComponent(ImpuestosTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
