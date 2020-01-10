import { Component, OnInit } from '@angular/core';
import { MatrixCommon } from '../matrix-common';
import { ConfigService } from '../../config.service';
@Component({
  selector: 'matrix-micro',
  templateUrl: './matrix-micro.component.html',
  styleUrls: ['./matrix-micro.component.scss']
})
export class MatrixMicroComponent extends MatrixCommon implements OnInit  {

    constructor(configService: ConfigService) { 
        super(configService);
    }

    ngOnInit() {}
}
