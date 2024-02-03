import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixFlatComponent } from './matrix-flat.component';
import { Matrix, Technique } from '../../classes/stix';
import { TechniqueVM, ViewModel } from '../../classes';
import * as MockData from '../../../tests/utils/mock-data';

describe('MatrixFlatComponent', () => {
    let component: MatrixFlatComponent;
    let fixture: ComponentFixture<MatrixFlatComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MatrixFlatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatrixFlatComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
