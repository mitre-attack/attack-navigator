import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MarkdownComponent, MatDialogActions, MatButton, MatDialogClose],
})
export class ChangelogComponent {
    @ViewChild('markdownElement', { static: false }) public markdownElement: any;

    constructor(
        private dialog: MatDialog,
        private markdownService: MarkdownService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        // intentionally left blank
    }
}
