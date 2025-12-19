import tinycolor from 'tinycolor2';
import tinygradient from 'tinygradient';

export class Gradient {
    // gradient class used by ViewModels
    // official colors used in gradients:
    public colors: Gcolor[] = [new Gcolor('red'), new Gcolor('green')]; //current colors
    public options: string[] = ['#ffffff', '#ff6666', '#ffaf66', '#ffe766', '#8ec843', '#66b1ff', '#ff66f4']; //possible colors
    public minValue: number = 0;
    public maxValue: number = 100;
    public gradient: any;
    public gradientRGB: any;

    // presets in dropdown menu
    public presets = {
        redgreen: [new Gcolor('#ff6666'), new Gcolor('#ffe766'), new Gcolor('#8ec843')],
        greenred: [new Gcolor('#8ec843'), new Gcolor('#ffe766'), new Gcolor('#ff6666')],
        bluered: [new Gcolor('#66b1ff'), new Gcolor('#ff66f4'), new Gcolor('#ff6666')],
        redblue: [new Gcolor('#ff6666'), new Gcolor('#ff66f4'), new Gcolor('#66b1ff')],
        transparentblue: [new Gcolor('#ffffff00'), new Gcolor('#66b1ff')],
        transparentred: [new Gcolor('#ffffff00'), new Gcolor('#ff6666')],
    };

    constructor() {
        this.setGradientPreset('redgreen');
    }

    /**
     * Create a string version of this gradient
     * @return string version of gradient
     */
    public serialize(): string {
        let colorList: string[] = [];
        this.colors.forEach(function (gColor: Gcolor) {
            let hexstring = tinycolor(gColor.color).toHex8String(); // include the alpha channel
            colorList.push(hexstring);
        });

        let rep = {
            colors: colorList,
            minValue: this.minValue,
            maxValue: this.maxValue,
        };
        return JSON.stringify(rep, null, '\t');
    }

    /**
     * Restore this gradient from the given serialized representation
     * @param  rep serialized gradient
     */
    public deserialize(rep: string): void {
        let obj = JSON.parse(rep);
        let isColorStringArray = function (colors): boolean {
            for (let color of colors) {
                if (typeof color !== 'string' || !tinycolor(color).isValid()) {
                    console.error('TypeError:', color, '(', typeof color, ')', 'is not a color-string');
                    return false;
                }
            }
            return true;
        };

        if (isColorStringArray(obj.colors)) {
            this.colors = [];
            let self = this;
            obj.colors.forEach(function (hex: string) {
                self.colors.push(new Gcolor(hex));
            });
        } else console.error('TypeError: gradient colors field is not a color-string[]');
        this.minValue = obj.minValue;
        this.maxValue = obj.maxValue;
        this.updateGradient();
    }

    /**
     * Convert a preset to tinycolor array
     * @param  preset preset name from preset array
     * @return        [description]
     */
    public presetToTinyColor(preset) {
        let colorarray = [];
        this.presets[preset].forEach(function (gcolor: Gcolor) {
            colorarray.push(gcolor.color);
        });
        return tinygradient(colorarray).css('linear', 'to right');
    }

    /**
     * set this gradient to use the preset
     * @param  preset preset to use
     */
    public setGradientPreset(preset: string): void {
        this.colors = this.presets[preset].map((color: Gcolor) => new Gcolor(color.color)); //deep copy gradient preset
        this.updateGradient();
    }

    /**
     * recompute gradient
     */
    public updateGradient(): void {
        let colorarray = [];
        this.colors.forEach(function (colorobj) {
            colorarray.push(colorobj.color);
        });
        this.gradient = tinygradient(colorarray);
        this.gradientRGB = this.gradient.rgb(100);
    }

    /**
     * Add a color to the end of the gradient
     */
    public addColor(): void {
        this.colors.push(new Gcolor(this.colors[this.colors.length - 1].color));
    }

    /**
     * Remove color at the given index
     * @param index index to remove color at
     */
    public removeColor(index): void {
        this.colors.splice(index, 1);
    }

    // get the gradient hex color for a given value in the scale. Value is string format number
    public getHexColor(valueString: string) {
        if (!this.gradient) this.updateGradient();

        let value: number;
        if (valueString.length == 0) return;
        else value = Number(valueString);

        if (value >= this.maxValue) {
            return this.gradientRGB[this.gradientRGB.length - 1].toHexString();
        }
        if (value <= this.minValue) {
            return this.gradientRGB[0].toHexString();
        }
        let index = ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
        let indexRounded = Math.min(Math.round(index), this.gradientRGB.length - 1); // prune value to the maximum possible index of the array
        return this.gradientRGB[indexRounded].toHexString();
    }
}

// a color in the gradient
export class Gcolor {
    color: string;

    constructor(color: string) {
        this.color = color;
    }
}
