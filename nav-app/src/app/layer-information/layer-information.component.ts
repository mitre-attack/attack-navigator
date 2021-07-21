import { Component, ViewEncapsulation } from '@angular/core';
import * as globals from "../globals";

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerInformationComponent {
  public get layerFormatLink(): string {
    return `../layers/LAYERFORMATv${ globals.layer_version.replace(".", "_") }.md`
  }
}
