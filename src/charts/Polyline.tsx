import { SvgElement } from 'svg/SvgElement';
import { SvgPolyline } from 'svg/SvgPolyline';
import { SeriesElement } from './SeriesElement';

export class Polyline extends SeriesElement {
  protected getNewWithType(): SeriesElement {
    return new Polyline();
  }
  protected getNewSvgElementWithType(): SvgElement {
    return new SvgPolyline();
  }

  addBottom(): void {
    // No need for bottom for line elements
  }

  toOutlineElement(): SvgPolyline {
    throw new Error('Method not implemented.');
  }

  stackedOn(elements: SeriesElement[]): void {
    throw new Error('Method not implemented.');
  }
}
