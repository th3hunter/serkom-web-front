import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposImpuestoPanComponent } from './tipos-impuesto-pan.component';

describe('TiposImpuestoPanComponent', () => {
  let component: TiposImpuestoPanComponent;
  let fixture: ComponentFixture<TiposImpuestoPanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposImpuestoPanComponent]
    });
    fixture = TestBed.createComponent(TiposImpuestoPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
