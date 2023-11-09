import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { ViewModelsService } from '../../services/viewmodels.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TechniqueCellComponent', () => {
    let component: TechniqueCellComponent;
    let fixture: ComponentFixture<TechniqueCellComponent>; // only needed for METHOD 2

    beforeAll(() => {
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
});
