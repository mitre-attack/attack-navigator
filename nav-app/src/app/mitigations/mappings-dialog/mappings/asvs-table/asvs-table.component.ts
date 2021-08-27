import { Component, Input, OnInit } from '@angular/core';
import { AsvsOwaspItem } from 'app/control-framework/control-frameworks/asvs-owasp-item';

@Component({
  selector: 'asvs-table',
  templateUrl: './asvs-table.component.html',
  styleUrls: ['./asvs-table.component.scss']
})
export class AsvsTableComponent implements OnInit {
  @Input() data: AsvsOwaspItem[];
  
  constructor() { }

  ngOnInit() {
  }

}
