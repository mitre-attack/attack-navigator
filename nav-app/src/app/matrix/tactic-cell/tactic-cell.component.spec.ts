import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TacticCellComponent } from './tactic-cell.component';

describe('TacticCellComponent', () => {
  let component: TacticCellComponent;
  let fixture: ComponentFixture<TacticCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
