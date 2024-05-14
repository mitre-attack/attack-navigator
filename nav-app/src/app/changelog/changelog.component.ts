import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
})
export class ChangelogComponent {
    @ViewChild('markdownElement', { static: false }) private markdownElement: MarkdownComponent;

    constructor(
        private dialog: MatDialog,
        private markdownService: MarkdownService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        // intentionally left blank
    }
}
