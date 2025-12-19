import { Component, ViewEncapsulation } from '@angular/core';
import * as globals from '../utils/globals';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MarkdownComponent } from 'ngx-markdown';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-layer-information',
    templateUrl: './layer-information.component.html',
    styleUrls: ['./layer-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [CdkScrollable, MatDialogContent, MarkdownComponent, MatDialogActions, MatButton, MatDialogClose],
})
export class LayerInformationComponent {
    public get layerFormatLink(): string {
        return `./layers/spec/v${globals.layerVersion}/layerformat.md`;
    }
}
