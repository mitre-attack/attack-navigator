"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NistMappingsComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var NistMappingsComponent = /** @class */ (function () {
    function NistMappingsComponent() {
    }
    NistMappingsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], NistMappingsComponent.prototype, "data");
    NistMappingsComponent = __decorate([
        core_1.Component({
            selector: 'nist-mappings',
            templateUrl: './nist-mappings.component.html',
            styleUrls: ['./nist-mappings.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0', display: 'none' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ])
            ]
        })
    ], NistMappingsComponent);
    return NistMappingsComponent;
}());
exports.NistMappingsComponent = NistMappingsComponent;
