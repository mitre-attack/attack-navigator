import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Link, Metadata, ViewModel } from '../viewmodels.service';

@Component({
    selector: 'app-list-input',
    templateUrl: './list-input.component.html',
    styleUrls: ['./list-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListInputComponent implements OnInit {
    @Input() config: ListInputConfig;
    public list: (Link|Metadata)[];
    private fieldToClass = {
        "links": Link,
        "metadata": Metadata
    }
    public get includeLinks(): boolean { return this.config.type == "links"; }

    constructor() { }

    ngOnInit(): void {
        if (this.config.level == 'technique') {
            this.list = this.config.list.map(item => {
                let clone = new this.fieldToClass[this.config.type]();
                clone.deSerialize(item.serialize());
                return clone;
            });
        } else {
            this.list = this.config.list;
        }
    }
    
    /**
     * Adds a new item to the list
     */
    public add(): void {
        this.list.push(new this.fieldToClass[this.config.type]());
    }

    /**
     * Removes an item from the list at the given index
     * @param i the index of the item to remove
     */
    public remove(i: number): void {
        if (this.list[i - 1] && this.list[i - 1].divider && this.list[i + 1] && this.list[i + 1].divider) {
            this.list.splice(i - 1, 2);
        } else {
            this.list.splice(i, 1);
        }

        if (this.list[0] && this.list[0].divider) this.removeDivider(0);
        if (this.list[this.list.length - 1] && this.list[this.list.length - 1].divider) this.removeDivider(this.list.length - 1);

        this.updateList();
    }

    /**
     * Validate items in the list and update the field on selected techniques
     */
    public updateList(): void {
        let value = this.list.filter(item => item.valid());

        if (this.config.level == 'technique') { // do not update techniques if editing a layer-level list
            this.config.viewModel.editSelectedTechniqueValues(this.config.type, value);
        }
    }

    /**
     * Checks if a divider can be added at the previous index
     * 
     * Note: a divider can only be added if both the items at the current and previous
     * indices are valid non-divider items.
     * 
     * @param i the current index
     * @returns true, if a divider can be added, false otherwise
     */
    public canAddDivider(i: number): boolean {
        if (i < 1) return false; // cannot add divider before the first item
        if (this.list[i] && this.list[i].valid() && !this.list[i].divider && 
            this.list[i - 1] && this.list[i - 1].valid() && !this.list[i - 1].divider) {
            return true;
        }
        return false;
    }

    /**
     * Add a divider at the given index
     * @param i the index at which to add a divider
     */
    public addDivider(i: number): void {
        let item = new this.fieldToClass[this.config.type]();
        item.divider = true;
        this.list.splice(i, 0, item);
        this.updateList();
    }

    /**
     * Remove a divider at the given index
     * @param i the index of the divider to remove
     */
    public removeDivider(i: number): void {
        this.list.splice(i, 1);
        this.updateList();
    }
}

export interface ListInputConfig {
    /** The viewmodel */
    viewModel: ViewModel;
    /** The list to edit */
    list: (Link|Metadata)[];
    /** The item type */
    type: "links" | "metadata";
    /**
     * Identifies whether the list exists on the technique or layer level
     * If on the technique level, the list must be cloned to prevent 
     * empty values from being added; all selected techniques
     * will be updated with the new values
     * If on the layer level, the list is edited directly and does
     * not update selected techniques with the new values
     */
    level: "layer" | "technique";
    /** The label attribute of the list */
    nameField: string;
    /** The value attribute of the list */
    valueField: string;
}