import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../classes';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-layer-settings',
  templateUrl: './layer-settings.component.html',
  styleUrls: ['./layer-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerSettingsComponent {
  @Input() viewModel: ViewModel;

  constructor(
      public dataService: DataService,
  ) {
      // intentionally left blank
  }
}
