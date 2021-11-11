import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
  @ViewChild('markdownElement', {static: false}) private markdownElement: MarkdownComponent;

  constructor(private dialog: MatDialog,
              private markdownService: MarkdownService,
              @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

}
