import { BasicPalette } from 'colors/BasicPalette';
import { Filter } from 'colors/filters/Filter';
import { HSLFilter } from 'colors/filters/HSLFilter';
import { Hex } from 'colors/Hex';
import { HSL } from 'colors/HSL';
import {
  FILTER_NAME_PREFIX_SERIES,
  LUMINANCE_DECREASE_SERIES
} from 'Constants';

export class DefaultSeriesPalette extends BasicPalette {
  constructor() {
    super(
      new Hex('4daf4a'),
      new Hex('d22d2f'),
      new Hex('377eb8'),
      new Hex('984ea3')
    );
  }

  asFilters(): DefaultSeriesPalette {
    let filters: Filter[] = [];

    this.colors.forEach((color) => {
      filters.push(new HSLFilter(color.toHsl(), FILTER_NAME_PREFIX_SERIES));

      let shifted: HSL = color.clone().toHsl();
      shifted.decreaseLuminance(LUMINANCE_DECREASE_SERIES);
      filters.push(new HSLFilter(shifted.toHsl(), FILTER_NAME_PREFIX_SERIES));
    });

    this.colors = filters;

    return this;
  }
}
