import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as globals from "../globals";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerInformationComponent implements OnInit {
  nav_version: string = globals.nav_version;
  layerFormatLink: string = '../layers/LAYERFORMATv4_2.md';

  constructor() { }

  ngOnInit(): void {
    if (this.nav_version) this.layerFormatLink = `../layers/LAYERFORMATv${this.nav_version.replace('.', '_')}.md`;
  }

}
