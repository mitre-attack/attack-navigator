import { Component, OnInit } from '@angular/core';
import { MatrixCommon } from '../matrix-common';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'matrix-side',
  templateUrl: './matrix-side.component.html',
  styleUrls: ['./matrix-side.component.scss']
})
export class MatrixSideComponent extends MatrixCommon implements OnInit  {

    constructor(configService: ConfigService) { 
        super(configService);
    }

    ngOnInit() {}
}
