import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciasPanComponent } from './instancias-pan.component';

describe('InstanciasPanComponent', () => {
  let component: InstanciasPanComponent;
  let fixture: ComponentFixture<InstanciasPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanciasPanComponent]
    });
    fixture = TestBed.createComponent(InstanciasPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
