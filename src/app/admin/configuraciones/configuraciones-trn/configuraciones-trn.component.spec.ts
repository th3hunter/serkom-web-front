import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesTrnComponent } from './configuraciones-trn.component';

describe('ConfiguracionesTrnComponent', () => {
  let component: ConfiguracionesTrnComponent;
  let fixture: ComponentFixture<ConfiguracionesTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionesTrnComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionesTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
