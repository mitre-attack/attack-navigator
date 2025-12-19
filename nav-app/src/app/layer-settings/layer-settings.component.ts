import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../classes';
import { DataService } from '../services/data.service';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { ListInputComponent } from '../list-input/list-input.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-layer-settings',
    templateUrl: './layer-settings.component.html',
    styleUrls: ['./layer-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, FormsModule, MatDivider, ListInputComponent, MatButton],
})
export class LayerSettingsComponent {
    @Input() viewModel: ViewModel;

    constructor(public dataService: DataService) {
        // intentionally left blank
    }
}
