import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";

@Component({
    selector: 'app-version-mismatch',
    templateUrl: './version-mismatch.component.html'
})
export class VersionMismatchComponent {
    @ViewChild('markdownElement', { static: false }) private markdownElement: MarkdownComponent;

    constructor(private dialog: MatDialog,
                private markdownService: MarkdownService,
                @Inject(MAT_DIALOG_DATA) public data) {
        // intentionally left blank
    }
}
