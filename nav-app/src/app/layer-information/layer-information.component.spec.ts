import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerInformationComponent } from './layer-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LayerInformationComponent', () => {
    let component: LayerInformationComponent;
    let fixture: ComponentFixture<LayerInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, MarkdownModule.forRoot({ loader: HttpClient })],
            declarations: [LayerInformationComponent],
            providers: [MarkdownService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayerInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
