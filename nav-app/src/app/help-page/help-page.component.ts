import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpPageComponent implements OnInit {
  @ViewChild('markdownElement', {static: false}) private markdownElement: MarkdownComponent;

  constructor() { }

  ngOnInit(): void {}

}
