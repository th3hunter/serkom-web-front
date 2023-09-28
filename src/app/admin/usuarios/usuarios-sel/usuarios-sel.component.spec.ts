import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSelComponent } from './usuarios-sel.component';

describe('UsuariosSelComponent', () => {
  let component: UsuariosSelComponent;
  let fixture: ComponentFixture<UsuariosSelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosSelComponent]
    });
    fixture = TestBed.createComponent(UsuariosSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
