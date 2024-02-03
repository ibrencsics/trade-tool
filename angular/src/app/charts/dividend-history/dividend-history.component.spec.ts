import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendHistoryComponent } from './dividend-history.component';

describe('DividendHistoryComponent', () => {
  let component: DividendHistoryComponent;
  let fixture: ComponentFixture<DividendHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DividendHistoryComponent]
    });
    fixture = TestBed.createComponent(DividendHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
