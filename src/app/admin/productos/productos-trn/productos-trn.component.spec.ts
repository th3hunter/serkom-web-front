import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTrnComponent } from './productos-trn.component';

describe('ProductosTrnComponent', () => {
  let component: ProductosTrnComponent;
  let fixture: ComponentFixture<ProductosTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosTrnComponent]
    });
    fixture = TestBed.createComponent(ProductosTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
