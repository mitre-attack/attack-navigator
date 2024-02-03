import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixSideComponent } from './matrix-side.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('MatrixSideComponent', () => {
    let component: MatrixSideComponent;
    let fixture: ComponentFixture<MatrixSideComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            declarations: [MatrixSideComponent],
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
