import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChartComponent } from './my-chart.component';

describe('MyChartComponent', () => {
  let component: MyChartComponent;
  let fixture: ComponentFixture<MyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
