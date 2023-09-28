import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProductoPanComponent } from './tipos-producto-pan.component';

describe('TiposProductoPanComponent', () => {
  let component: TiposProductoPanComponent;
  let fixture: ComponentFixture<TiposProductoPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposProductoPanComponent]
    });
    fixture = TestBed.createComponent(TiposProductoPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
