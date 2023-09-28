import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPanComponent } from './productos-pan.component';

describe('ProductosPanComponent', () => {
  let component: ProductosPanComponent;
  let fixture: ComponentFixture<ProductosPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosPanComponent]
    });
    fixture = TestBed.createComponent(ProductosPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
