import { PaletteGenerator } from 'colors/PaletteGenerator';
import { DefaultGroupPalette } from './DefaultGroupPalette';
import { DefaultSeriesPalette } from './DefaultSeriesPalette';
import { DefaultTotalColor } from './DefaultTotalColor';

export class DefaultPaletteGenerator extends PaletteGenerator {
  constructor() {
    super(
      new DefaultSeriesPalette(),
      new DefaultGroupPalette(),
      new DefaultTotalColor(),
    );
  }
}
