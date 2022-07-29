import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ChangelogCellComponent } from './changelog-cell.component';

describe('ChangelogCellComponent', () => {
    let component: ChangelogCellComponent;
    let fixture: ComponentFixture<ChangelogCellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
        HttpClientTestingModule 
      ],
            declarations: [ChangelogCellComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangelogCellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
