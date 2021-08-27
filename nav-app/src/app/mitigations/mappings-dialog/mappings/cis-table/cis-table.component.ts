import { Component, Input, OnInit } from '@angular/core';
import { CisItem } from 'app/control-framework/control-frameworks/cis-item';

@Component({
  selector: 'cis-table',
  templateUrl: './cis-table.component.html',
  styleUrls: ['./cis-table.component.scss']
})
export class CisTableComponent implements OnInit {
  @Input() data: CisItem[];

  constructor() { }

  ngOnInit() {
  }

}
