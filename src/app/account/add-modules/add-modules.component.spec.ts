import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModulesComponent } from './add-modules.component';

describe('AddModulesComponent', () => {
  let component: AddModulesComponent;
  let fixture: ComponentFixture<AddModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModulesComponent]
    });
    fixture = TestBed.createComponent(AddModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
