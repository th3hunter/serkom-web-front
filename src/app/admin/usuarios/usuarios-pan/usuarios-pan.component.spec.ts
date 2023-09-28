import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPanComponent } from './usuarios-pan.component';

describe('UsuariosPanComponent', () => {
  let component: UsuariosPanComponent;
  let fixture: ComponentFixture<UsuariosPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosPanComponent]
    });
    fixture = TestBed.createComponent(UsuariosPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
