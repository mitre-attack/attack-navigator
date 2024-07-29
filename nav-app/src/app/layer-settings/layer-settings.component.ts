import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../classes';
import { DataService } from '../services/data.service';
import { ViewModelsService } from '../services/viewmodels.service';

@Component({
  selector: 'app-layer-settings',
  templateUrl: './layer-settings.component.html',
  styleUrls: ['./layer-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerSettingsComponent implements OnInit {
  @Input() viewModel: ViewModel;

  constructor(
      public dataService: DataService,
  ) {
      // intentionally left blank
  }

  ngOnInit(): void {
    console.log(this.dataService.getDomain(this.viewModel.domainVersionID))
  }
}
