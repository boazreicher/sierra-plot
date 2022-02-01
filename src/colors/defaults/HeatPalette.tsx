import { BasicPalette } from 'colors/BasicPalette';
import { Hex } from 'colors/Hex';

export class HeatPalette extends BasicPalette {
  constructor() {
    super(new Hex('003f5c'), new Hex('7a5195'), new Hex('ef5675'), new Hex('ffa600'));
  }
}
