import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SvgExportComponent } from './svg-export.component';
import { ViewModel } from '../classes';

describe('SvgExportComponent', () => {
    let component: SvgExportComponent;
    let fixture: ComponentFixture<SvgExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            declarations: [SvgExportComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        vm: new ViewModel('layer', '33', 'enterprise-attack-13', null)
                    },
                },
                SvgExportComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SvgExportComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("getters", () => {
        it('should return true if getName is true', () => {
            expect(component.hasName).toBeTrue()
        })
        it('should return true if hasDomain is true', () => {
            expect(component.hasDomain).toBeTrue()
        })
        it('should return false if hasDescription is false', () => {
            expect(component.hasDescription).toBeFalse()
        })
        it('should return false if showAggregate is false', () => {
            expect(component.showAggregate).toBeFalse()
        })
        it('should return true if showFilters is true', () => {
            expect(component.showFilters).toBeTrue()
        })
        it('should return true if showLegendInHeader is true', () => {
            expect(component.showLegendInHeader).toBeTrue()
        })
    })

    describe('setSize', () => {
        it('should set correct dimensions for standard sizes in portrait orientation', () => {
            const sizes = ['letter', 'legal', 'small', 'medium', 'large'];
            sizes.forEach(size => {
                component['setSize'](component, size, 'portrait');
                expect(component.config.width).toBeGreaterThan(0);
                expect(component.config.height).toBeGreaterThan(0);
            });
        });

        it('should set correct dimensions for standard sizes in landscape orientation', () => {
            const sizes = ['letter', 'legal', 'small', 'medium', 'large'];
            sizes.forEach(size => {
                component['setSize'](component, size, 'landscape');
                expect(component.config.width).toBeGreaterThan(0);
                expect(component.config.height).toBeGreaterThan(0);
            });
        });

        it('should not modify size for custom dimensions', () => {
            const originalWidth = component.config.width;
            const originalHeight = component.config.height;
            component['setSize'](component, 'custom', 'portrait');
            expect(component.config.width).toBe(originalWidth);
            expect(component.config.height).toBe(originalHeight);
        });
    });

    describe('verticalAlignCenter', () => {
        it('should adjust y position of a single node', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should correctly adjust child nodes', () => {
            let parentNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            parentNode.setAttribute('font-size', '20px');

            let childNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            childNode.setAttribute('y', '10');
            parentNode.appendChild(childNode);
            fixture.nativeElement.appendChild(parentNode);

            component['verticalAlignCenter'](parentNode);
            expect(childNode.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should handle different font sizes', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '30px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should handle nodes without initial y attribute', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.hasAttribute('y')).toBeTrue();
        });

        it('should handle nodes without children', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });
    });

    describe('optimalFontSize', () => {
        it('should return a number and not exceed maxFontSize', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'Sample text', 100, 100, false, 12);
            expect(result).toBeLessThanOrEqual(12);
            expect(typeof result).toBe('number');
        });
        it('should handle short text correctly', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'Short text', 100, 50, false, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle medium text correctly', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'This is a medium length text', 100, 50, false, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle long text correctly', () => {
            let longText = 'This is a very long text string that is intended to test how the optimalFontSize function behaves when dealing with a large amount of text within a constrained space';
            let result = component['optimalFontSize'](fixture.nativeElement, longText, 100, 50, false, 12);
            expect(result).toBeLessThan(12);
        });

        it('should adjust size based on cell width', () => {
            let text = 'Sample text';
            let smallWidthResult = component['optimalFontSize'](fixture.nativeElement, text, 50, 50, false, 12);
            let largeWidthResult = component['optimalFontSize'](fixture.nativeElement, text, 200, 50, false, 12);
            expect(largeWidthResult).toBeGreaterThanOrEqual(smallWidthResult);
        });

        it('should adjust size based on cell height', () => {
            let text = 'Sample text';
            let smallHeightResult = component['optimalFontSize'](fixture.nativeElement, text, 100, 25, false, 12);
            let largeHeightResult = component['optimalFontSize'](fixture.nativeElement, text, 100, 100, false, 12);
            expect(largeHeightResult).toBeGreaterThanOrEqual(smallHeightResult);
        });

        it('should respect center alignment', () => {
            let text = 'Centered text';
            let result = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, true, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle different max font sizes', () => {
            let text = 'Sample text';
            let resultSmallMax = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, false, 8);
            let resultLargeMax = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, false, 16);
            expect(resultLargeMax).toBeGreaterThanOrEqual(resultSmallMax);
        });

    });

    describe('getSpacing', () => {
        let component: SvgExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(SvgExportComponent);
            component = fixture.debugElement.componentInstance;
        });

        it('should return correct number of divisions', () => {
            const distance = 100;
            const divisions = 4;
            const spacing = component['getSpacing'](distance, divisions);
            expect(spacing.length).toEqual(divisions);
        });

        it('should handle zero divisions', () => {
            const spacing = component['getSpacing'](100, 0);
            expect(spacing.length).toEqual(0);
        });

        it('should return equidistant points', () => {
            const distance = 100;
            const divisions = 4;
            const spacing = component['getSpacing'](distance, divisions);
            let equalDistance = true;
            for (let i = 1; i < spacing.length; i++) {
                if (spacing[i] - spacing[i - 1] !== spacing[1] - spacing[0]) {
                    equalDistance = false;
                    break;
                }
            }
            expect(equalDistance).toBeTrue();
        });

        it('should handle negative values gracefully', () => {
            const spacing = component['getSpacing'](-100, -4);
        });

    });
    describe('findBreaks', () => {
        let component: SvgExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(SvgExportComponent);
            component = fixture.debugElement.componentInstance;
        });

        it('should handle zero spaces correctly', () => {
            const result = component['findBreaks'](0, 0);
            expect(result.size).toBe(1);
            expect(result.has('')).toBeTrue();
        });

        it('should return the correct total number of spaces and breaks', () => {
            const spaces = 4;
            const breaks = 2;
            const result = component['findBreaks'](spaces, breaks);
            result.forEach(breakPattern => {
                expect(breakPattern.length).toBe(spaces);
            });
        });

        it('should return a Set of strings', () => {
            const result = component['findBreaks'](3, 1);
            expect(result instanceof Set).toBeTrue();
            result.forEach(breakPattern => {
                expect(typeof breakPattern).toBe('string');
            });
        });
    });

    describe('toPx', () => {
        it('should convert inches to pixels', inject([SvgExportComponent], (component: SvgExportComponent) => {
            expect(component['toPx'](1, 'in')).toEqual(96);
        }));
        it('should convert centimeters to pixels', () => {
            expect(component['toPx'](1, 'cm')).toEqual(37.79375);
        });

        it('should handle pixels as pixels', () => {
            expect(component['toPx'](1, 'px')).toEqual(1);
        });

        it('should convert ems to pixels', () => {
            expect(component['toPx'](1, 'em')).toEqual(16);
        });

        it('should convert points to pixels', () => {
            expect(component['toPx'](1, 'pt')).toEqual(1.33);
        });

        it('should handle unknown units by logging an error and returning 0', () => {
            const consoleSpy = spyOn(console, 'error');
            expect(component['toPx'](1, 'unknown')).toEqual(0);
            expect(consoleSpy).toHaveBeenCalledWith('unknown unit', 'unknown');
        });
    });
});
