import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatrixFlatComponent } from './matrix-flat.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrixFlatComponent', () => {
    let component: MatrixFlatComponent;
    let fixture: ComponentFixture<MatrixFlatComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatrixFlatComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(MatrixFlatComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
