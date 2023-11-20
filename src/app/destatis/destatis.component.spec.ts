import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestatisComponent } from './destatis.component';

describe('DestatisComponent', () => {
  let component: DestatisComponent;
  let fixture: ComponentFixture<DestatisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestatisComponent]
    });
    fixture = TestBed.createComponent(DestatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
