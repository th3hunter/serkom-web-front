import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesPanComponent } from './configuraciones-pan.component';

describe('ConfiguracionesPanComponent', () => {
  let component: ConfiguracionesPanComponent;
  let fixture: ComponentFixture<ConfiguracionesPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionesPanComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionesPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
