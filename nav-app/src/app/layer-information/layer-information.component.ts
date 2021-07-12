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

  constructor() { }

  ngOnInit(): void {
    console.log('NAV VER', this.nav_version);
  }

}
