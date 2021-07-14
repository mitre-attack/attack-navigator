import { Component, ViewEncapsulation } from '@angular/core';
import * as globals from "../globals";

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerInformationComponent {
  layer_version: string = globals.layer_version;
  layerFormatLink: string = `../layers/LAYERFORMATv${this.layer_version.replace('.', '_')}.md`;

  constructor() { }

}
