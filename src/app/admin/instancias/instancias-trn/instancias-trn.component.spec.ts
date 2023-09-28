import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciasTrnComponent } from './instancias-trn.component';

describe('InstanciasTrnComponent', () => {
  let component: InstanciasTrnComponent;
  let fixture: ComponentFixture<InstanciasTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanciasTrnComponent]
    });
    fixture = TestBed.createComponent(InstanciasTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
