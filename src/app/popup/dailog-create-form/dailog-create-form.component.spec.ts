import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogCreateFormComponent } from './dailog-create-form.component';

describe('DailogCreateFormComponent', () => {
  let component: DailogCreateFormComponent;
  let fixture: ComponentFixture<DailogCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailogCreateFormComponent]
    });
    fixture = TestBed.createComponent(DailogCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
