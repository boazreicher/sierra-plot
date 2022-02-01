import { BasicPalette } from 'colors/BasicPalette';
import { Hex } from 'colors/Hex';

export class HeatInvertedPalette extends BasicPalette {
  constructor() {
    super(
      new Hex('ffa600'),
      new Hex('ef5675'),
      new Hex('7a5195'),
      new Hex('003f5c'),
    );
  }
}
