import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasTrnComponent } from './empresas-trn.component';

describe('EmpresasTrnComponent', () => {
  let component: EmpresasTrnComponent;
  let fixture: ComponentFixture<EmpresasTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresasTrnComponent]
    });
    fixture = TestBed.createComponent(EmpresasTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
