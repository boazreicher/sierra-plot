import { BasicPalette } from 'colors/BasicPalette';
import { Filter } from 'colors/filters/Filter';
import { HSLFilter } from 'colors/filters/HSLFilter';
import { Hex } from 'colors/Hex';
import { FILTER_NAME_PREFIX_GROUP } from 'Constants';

export class DefaultGroupPalette extends BasicPalette {
  constructor() {
    super(
      new Hex('8a3ffc'),
      new Hex('33b1ff'),
      new Hex('007d79'),
      new Hex('ff7eb6'),
      new Hex('fa4d56'),
      new Hex('6fdc8c'),
      new Hex('4589ff'),
      new Hex('d12771'),
      new Hex('d2a106'),
      new Hex('08bdba'),
      new Hex('bae6ff'),
      new Hex('ba4e00'),
      new Hex('d4bbff')
    );
    super.setAttributes(80, 50);
  }

  asFilters(): DefaultGroupPalette {
    let filters: Filter[] = [];

    this.colors.forEach((color) => {
      filters.push(new HSLFilter(color.toHsl(), FILTER_NAME_PREFIX_GROUP));
    });

    this.colors = filters;

    return this;
  }
}
