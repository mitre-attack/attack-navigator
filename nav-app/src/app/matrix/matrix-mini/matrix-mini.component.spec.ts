import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatrixMiniComponent } from './matrix-mini.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrixMiniComponent', () => {
    let component: MatrixMiniComponent;
    let fixture: ComponentFixture<MatrixMiniComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatrixMiniComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatrixMiniComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
