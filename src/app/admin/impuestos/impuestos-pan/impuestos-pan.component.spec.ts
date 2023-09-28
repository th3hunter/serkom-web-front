import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosPanComponent } from './impuestos-pan.component';

describe('ImpuestosPanComponent', () => {
  let component: ImpuestosPanComponent;
  let fixture: ComponentFixture<ImpuestosPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpuestosPanComponent]
    });
    fixture = TestBed.createComponent(ImpuestosPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
