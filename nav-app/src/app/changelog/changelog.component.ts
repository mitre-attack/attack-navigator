import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";

@Component({
    selector: 'app-changelog',
    templateUrl: './changelog.component.html'
})
export class ChangelogComponent {
    @ViewChild('markdownElement', { static: false }) private markdownElement: MarkdownComponent;

    constructor(private dialog: MatDialog,
                private markdownService: MarkdownService,
                @Inject(MAT_DIALOG_DATA) public data) {
        // intentionally left blank
    }
}
