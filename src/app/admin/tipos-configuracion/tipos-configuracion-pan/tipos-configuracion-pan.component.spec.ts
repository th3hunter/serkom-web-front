import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposConfiguracionPanComponent } from './tipos-configuracion-pan.component';

describe('TiposConfiguracionPanComponent', () => {
  let component: TiposConfiguracionPanComponent;
  let fixture: ComponentFixture<TiposConfiguracionPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposConfiguracionPanComponent]
    });
    fixture = TestBed.createComponent(TiposConfiguracionPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
