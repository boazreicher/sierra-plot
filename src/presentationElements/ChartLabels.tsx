import { ChartData } from 'charts/ChartData';
import { Selection } from 'data/Selection';
import { SvgElement } from 'svg/SvgElement';
import { PresentationElement } from './PresentationElement';

export class ChartLabels implements PresentationElement {
  private charts: ChartData[];
  private selection: Selection;
  private enabled: boolean;

  constructor(charts: ChartData[], selection: Selection, enabled: boolean) {
    this.charts = charts;
    this.selection = selection;
    this.enabled = enabled;
  }

  toSvgElements(elements: SvgElement[]): SvgElement[] {
    if (!this.enabled) {
      return [];
    }

    let result: SvgElement[] = [];
    this.charts.forEach((chart) => {
      let inSelectedGroup = true;
      inSelectedGroup = chart.inSelectedGroup;
      result.push(chart.label.toSvg(this.selection, inSelectedGroup));
    });

    return result;
  }
}
