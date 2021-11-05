import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatrixFlatComponent } from './matrix-flat.component';
import { Tactic } from '../../data.service';


describe('MatrixFlatComponent', () => {
  let component: MatrixFlatComponent;
  let fixture: ComponentFixture<MatrixFlatComponent>;
  var mockViewModel = jasmine.createSpyObj('ViewModel', { showTacticRowBackground: false, legendItems: [], 
    filterTactics: (): Tactic[] => { return new Array<Tactic>() } })
  var mockMatrix = jasmine.createSpyObj('Matrix', { tactics: [] })


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixFlatComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixFlatComponent);
    component = fixture.componentInstance;
    component.viewModel = mockViewModel;
    component.matrix = mockMatrix;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
