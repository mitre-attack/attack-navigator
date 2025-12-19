import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerInformationComponent } from './layer-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import * as globals from '../utils/globals';

describe('LayerInformationComponent', () => {
    let component: LayerInformationComponent;
    let fixture: ComponentFixture<LayerInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MarkdownModule.forRoot({ loader: HttpClient }), LayerInformationComponent],
            providers: [MarkdownService, provideHttpClient(withInterceptorsFromDi())],
        }).compileComponents();

        fixture = TestBed.createComponent(LayerInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return correct layerFormatLink based on global layer version', () => {
        let filePath = `./layers/spec/v${globals.layerVersion}/layerformat.md`;
        expect(component.layerFormatLink).toBe(filePath);
    });
});
