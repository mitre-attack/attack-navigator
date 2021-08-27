"use strict";
exports.__esModule = true;
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var asvs_table_component_1 = require("./asvs-table.component");
describe('AsvsTableComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [asvs_table_component_1.AsvsTableComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(asvs_table_component_1.AsvsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
