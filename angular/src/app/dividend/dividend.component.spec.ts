import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendComponent } from './dividend.component';

describe('DividendComponent', () => {
  let component: DividendComponent;
  let fixture: ComponentFixture<DividendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DividendComponent]
    });
    fixture = TestBed.createComponent(DividendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
