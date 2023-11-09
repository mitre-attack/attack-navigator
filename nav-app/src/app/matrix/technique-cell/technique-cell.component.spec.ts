import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { ViewModelsService } from '../../services/viewmodels.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Tab, Version, TechniqueVM, ViewModel } from '../../classes';
// import { Technique, Tactic } from '../../classes/stix';

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
            declarations: [TechniqueCellComponent],
        });
        fixture = TestBed.createComponent(TechniqueCellComponent);
        component = fixture.debugElement.componentInstance;
        component.ngOnInit();
    });

    it('can create an instance of TechniqueCellComponent', () => {
        expect(component).toBeDefined();
    });

    it('#onMouseEnter() and #onMouseLeave() emit with highlighted and un-highlighted techniques, respectively', () => {
        component.onMouseEnter();

        expect(component.highlight).withContext('mouse was clicked').toBeDefined();

        component.onMouseLeave();

        expect(component.unhighlight).withContext('mouse was released').toBeDefined();
    });

    // it('cell pinned', () => {
    //     component.viewModel = component.viewModelsService.newViewModel("layer","enterprise-attack-13");
    //     let tvm_1 = new TechniqueVM("T1583");
    //     component.technique = new Technique(null,null,null);
    //     let tech: Technique [];
    //     tech.push(component.technique)
    //     component.tactic = new Tactic(null, tech, null)
    //     component.viewModel.setTechniqueVM(tvm_1);
    //     expect(component.isCellPinned).toEqual(false);
    // });

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
