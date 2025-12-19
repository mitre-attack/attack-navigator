import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatrixSideComponent } from './matrix-side.component';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrixSideComponent', () => {
    let component: MatrixSideComponent;
    let fixture: ComponentFixture<MatrixSideComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatrixSideComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatrixSideComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
