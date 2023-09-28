import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposConfiguracionTrnComponent } from './tipos-configuracion-trn.component';

describe('TiposConfiguracionTrnComponent', () => {
  let component: TiposConfiguracionTrnComponent;
  let fixture: ComponentFixture<TiposConfiguracionTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposConfiguracionTrnComponent]
    });
    fixture = TestBed.createComponent(TiposConfiguracionTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
