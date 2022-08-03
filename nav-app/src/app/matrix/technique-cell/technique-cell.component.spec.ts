import { TestBed } from '@angular/core/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { HttpClientModule } from '@angular/common/http';

describe('TechniqueCellComponent', () => {
  let component: TechniqueCellComponent;

  beforeAll(() => {
    // Instantiate a dummy Angular Module and use DI to initialize the TechniqueCellComponent
    const moduleRef = TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TechniqueCellComponent]
    });
    component = moduleRef.inject<TechniqueCellComponent>(TechniqueCellComponent);
  });

  it('can create an instance of TechniqueCellComponent', () => {
    expect(component).toBeDefined();
  });
});
