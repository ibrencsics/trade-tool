import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendSelectorComponent } from './dividend-selector.component';

describe('DividendSelectorComponent', () => {
  let component: DividendSelectorComponent;
  let fixture: ComponentFixture<DividendSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DividendSelectorComponent]
    });
    fixture = TestBed.createComponent(DividendSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
