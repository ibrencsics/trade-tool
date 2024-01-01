import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocLineChartComponent } from './poc-line-chart.component';

describe('PocLineChartComponent', () => {
  let component: PocLineChartComponent;
  let fixture: ComponentFixture<PocLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocLineChartComponent]
    });
    fixture = TestBed.createComponent(PocLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
