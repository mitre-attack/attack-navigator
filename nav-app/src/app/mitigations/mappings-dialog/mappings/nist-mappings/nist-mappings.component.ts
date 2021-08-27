import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AsvsOwaspItem } from 'app/control-framework/control-frameworks/asvs-owasp-item';
import { CisItem } from 'app/control-framework/control-frameworks/cis-item';
import { NistItem } from 'app/control-framework/control-frameworks/nist-item';

@Component({
  selector: 'nist-mappings',
  templateUrl: './nist-mappings.component.html',
  styleUrls: ['./nist-mappings.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class NistMappingsComponent implements OnInit {
  @Input() data: { nist: NistItem, asvs: AsvsOwaspItem[], cis: CisItem[] }[];
  expandedElement: any;
  
  constructor() { }

  ngOnInit() {
  }

}
