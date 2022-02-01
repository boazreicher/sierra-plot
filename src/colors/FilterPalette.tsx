import { Color } from 'colors/Color';
import { ColorPalette } from 'colors/ColorPalette';
import { Filter } from 'colors/filters/Filter';
import { ElementId } from 'data/ElementId';

export class FilterPalette implements ColorPalette {
  filterName: string;
  filter: Filter;

  constructor(filterName: string) {
    this.filterName = filterName;
    this.filter = new Filter(filterName);
  }

  resetIfDifferent(key: string | undefined): void {
    throw new Error('Method not implemented.');
  }

  reset(): void {
    throw new Error('Method not implemented.');
  }

  getColorFor(elementId: ElementId): Color {
    return this.filter;
  }

  next(): Color {
    return this.filter;
  }

  toArray(): Color[] {
    return [this.next()];
  }
}
