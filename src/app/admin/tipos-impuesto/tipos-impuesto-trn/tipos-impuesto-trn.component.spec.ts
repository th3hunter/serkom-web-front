import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposImpuestoTrnComponent } from './tipos-impuesto-trn.component';

describe('TiposImpuestoTrnComponent', () => {
  let component: TiposImpuestoTrnComponent;
  let fixture: ComponentFixture<TiposImpuestoTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposImpuestoTrnComponent]
    });
    fixture = TestBed.createComponent(TiposImpuestoTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
