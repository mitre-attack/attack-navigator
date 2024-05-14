import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MarkdownComponent, MarkdownService } from 'ngx-markdown';

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
})
export class ChangelogComponent {
    // TODO:
    // @ViewChild('markdownElement', { static: false }) private markdownElement: any;

    constructor(
        private dialog: MatDialog,
        // TODO:
        // private markdownService: MarkdownService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        // intentionally left blank
    }
}
