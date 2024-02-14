import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereHouseComponent } from './where-house.component';

describe('WhereHouseComponent', () => {
  let component: WhereHouseComponent;
  let fixture: ComponentFixture<WhereHouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhereHouseComponent]
    });
    fixture = TestBed.createComponent(WhereHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
