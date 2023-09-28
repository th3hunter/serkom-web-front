import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProductoTrnComponent } from './tipos-producto-trn.component';

describe('TiposProductoTrnComponent', () => {
  let component: TiposProductoTrnComponent;
  let fixture: ComponentFixture<TiposProductoTrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposProductoTrnComponent]
    });
    fixture = TestBed.createComponent(TiposProductoTrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
