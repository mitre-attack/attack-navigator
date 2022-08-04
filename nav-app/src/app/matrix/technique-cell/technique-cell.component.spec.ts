import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TechniqueCellComponent} from './technique-cell.component';
import {ViewModelsService} from '../../viewmodels.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('TechniqueCellComponent', () => {
  let component: TechniqueCellComponent;
  let fixture: ComponentFixture<TechniqueCellComponent>; // only needed for METHOD 2

  beforeAll(() => {
    // Instantiate a dummy Angular Module and use DI to initialize the TechniqueCellComponent

    // METHOD 1 - use this approach if you only intend to test the component class alone, without DOM involvement
    // const moduleRef = TestBed.configureTestingModule({
    //   imports: [HttpClientTestingModule],
    //   providers: [ViewModelsService],
    //   declarations: [TechniqueCellComponent]
    // });
    // component = moduleRef.inject<TechniqueCellComponent>(TechniqueCellComponent);

    // METHOD 2 - use this approach if you require access to the DOM to fully test the HTML template and TS class
    // working together.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewModelsService],
      declarations: [TechniqueCellComponent]
    });
    fixture = TestBed.createComponent(TechniqueCellComponent);
    component = fixture.componentInstance;
  });


  it('can create an instance of TechniqueCellComponent', () => {
    expect(component).toBeDefined();
  });

  it('#onMouseEnter() and #onMouseLeave() emit with highlighted and un-highlighted techniques, respectively', () => {
    component.onMouseEnter();

    expect(component.highlight)
      .withContext('mouse was clicked')
      .toBeDefined();

    component.onMouseLeave();

    expect(component.unhighlight)
      .withContext('mouse was released')
      .toBeDefined();
  });

  /**
   * TODO Figure out why the following test won't work.
   *  They all throw "TypeError: Cannot read properties of undefined (reading 'getTechniqueVM')"
   *  TechniqueCellComponents inherits getTechniqueVM from its base (abstract) class, Cell.
   */
// it('#onRightClick() shows the context menu', () => {
//   component.onRightClick(new Event('click'));
//   expect(component.showContextmenu)
//     .withContext('right button was click')
//     .toBe(true);
// });

  /**
   * TODO Figure out why the following test won't work.
   *  They all throw "TypeError: Cannot read properties of undefined (reading 'getTechniqueVM')"
   *  TechniqueCellComponents inherits getTechniqueVM from its base (abstract) class, Cell.
   */
// it('test #showTooltip()', () => {
//   expect(component.showTooltip)
//     .toBe(true);
// });
});
