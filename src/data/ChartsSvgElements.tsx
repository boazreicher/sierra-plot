import { ID_KV_SEPERATOR } from 'Constants';
import { PresentationElement } from 'presentationElements/PresentationElement';
import { SvgElement } from 'svg/SvgElement';
import { BoundingBox } from 'types';

export class ChartsSvgElements {
  private chartsElements: SvgElement[] = [];
  private presentationElements: PresentationElement[] = [];

  constructor(
    chartElements: PresentationElement,
    ...presentationElements: PresentationElement[]
  ) {
    this.chartsElements = chartElements.toSvgElements([]);
    presentationElements.forEach((presentationElement) =>
      this.presentationElements.push(presentationElement)
    );
  }

  getAllElements(): SvgElement[] {
    let result: SvgElement[] = [];

    this.presentationElements.forEach(
      (presentationElement) =>
        (result = result.concat(
          presentationElement.toSvgElements(this.chartsElements)
        ))
    );

    return this.chartsElements.concat(result);
  }

  getChartsElements(): SvgElement[] {
    return this.chartsElements;
  }

  getBoundingBoxForChartGroup(field: string, value: string): BoundingBox {
    let id = field + ID_KV_SEPERATOR + value;

    for (let index = 0; index < this.chartsElements.length; index++) {
      if (
        this.chartsElements[index].isChartGroup &&
        this.chartsElements[index].id == id
      ) {
        return this.chartsElements[index].boundingBox;
      }
    }

    throw new Error('Unable to find bounding box for ' + id);
  }
}
