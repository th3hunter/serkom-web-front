import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTrnComponent } from './usuarios-trn.component';

describe('UsuariosTrnComponent', () => {
  let component: UsuariosTrnComponent;
  let fixture: ComponentFixture<UsuariosTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosTrnComponent]
    });
    fixture = TestBed.createComponent(UsuariosTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
