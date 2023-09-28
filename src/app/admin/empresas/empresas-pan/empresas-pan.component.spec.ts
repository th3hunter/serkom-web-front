import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasPanComponent } from './empresas-pan.component';

describe('EmpresasPanComponent', () => {
  let component: EmpresasPanComponent;
  let fixture: ComponentFixture<EmpresasPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresasPanComponent]
    });
    fixture = TestBed.createComponent(EmpresasPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
