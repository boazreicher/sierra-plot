import { Color } from 'colors/Color';
import { ColorPalette } from 'colors/ColorPalette';
import { ElementId } from 'data/ElementId';

export class BasicPalette implements ColorPalette {
  protected colors: Color[] = [];
  private cursor = 0;
  private lastKey: string | undefined;

  constructor(...colors: Color[]) {
    this.colors = colors;
  }

  protected setAttributes(saturation: number, luminance: number) {
    let newColors: Color[] = [];
    this.colors.forEach((color) => {
      let newColor = color.toHsl();
      newColor.s = saturation;
      newColor.s = luminance;
      newColors.push(newColor);
    });
    this.colors = newColors;
  }

  resetIfDifferent(key: string | undefined): void {
    if (this.lastKey !== key) {
      this.reset();
      this.lastKey = key;
    }
  }

  reset(): void {
    this.cursor = 0;
  }

  getColorFor(elementId: ElementId): Color {
    throw new Error('Method not implemented.');
  }

  addColor(color: Color) {
    this.colors.push(color);
  }

  next(): Color {
    var color = this.colors[this.cursor % this.colors.length];
    this.cursor++;

    return color;
  }

  toArray(): Color[] {
    return this.colors;
  }
}
