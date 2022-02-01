import { BasicPalette } from 'colors/BasicPalette';
import { ColorPalette } from 'colors/ColorPalette';

export enum PaletteType {
  Regular = 1,
  Selected,
}

export class ColorPalettes {
  private palettes: Record<PaletteType, ColorPalette> = {
    1: new BasicPalette(),
    2: new BasicPalette(),
  };

  addPalette(type: PaletteType, palette: ColorPalette) {
    this.palettes[type] = palette;
  }

  getPalette(type: PaletteType): ColorPalette {
    return this.palettes[type];
  }
}
