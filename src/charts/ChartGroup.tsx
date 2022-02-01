import { ChartGroupPresentationProperties } from 'charts/ChartGroups';
import {
  GROUP_LABEL_CLASS,
  GROUP_LABEL_MARGIN_X,
  GROUP_LABEL_MARGIN_Y,
  ID_KV_SEPERATOR,
  ID_PREFIX_GROUP_ELEMENT,
  ID_PREFIX_LINE_ELEMENT,
  ID_SEPERATOR,
  ID_TYPE_GROUP_ELEMENT,
  ZORDER_GROUP_BOUNDS,
  ZORDER_GROUP_LABEL,
} from 'Constants';
import { getOnClickHandlerForGroupBounds } from 'presentationElements/EventHandlers';
import { SvgElement } from 'svg/SvgElement';
import { SvgPolygon } from 'svg/SvgPolygon';
import { SvgText } from 'svg/SvgText';
import { BoundingBox, Coordinates, SierraPlotOptions } from 'types';
import { Selection, SelectionType } from 'data/Selection';
import { ElementId } from 'data/ElementId';

export class ChartGroup {
  name: string;
  boundingBox: BoundingBox = new BoundingBox();
  // Using Record<string, boolean> since Set<string> doesn't work for some reason...
  charts: Record<string, boolean> = {};

  constructor(name: string) {
    this.name = name;
  }

  addChart(name: string): void {
    this.charts[name] = true;
  }

  toSvgElements(
    panelOptions: SierraPlotOptions,
    presentationProperties: ChartGroupPresentationProperties,
  ): SvgElement[] {
    let polygon = this.toPolygon(panelOptions, presentationProperties);
    let label = this.toLabel(
      presentationProperties,
      panelOptions.groupLabelSize,
      panelOptions.selectedChart,
    );

    return [polygon, label];
  }

  private toPolygon(
    panelOptions: SierraPlotOptions,
    presentationProperties: ChartGroupPresentationProperties,
  ): SvgElement {
    var coordinatesForGroupElement: Coordinates[] = [];

    coordinatesForGroupElement.push(
      new Coordinates(this.boundingBox.maxX, this.boundingBox.minY - 2),
    );
    coordinatesForGroupElement.push(
      new Coordinates(0, this.boundingBox.minY - 2),
    );
    coordinatesForGroupElement.push(new Coordinates(0, this.boundingBox.maxY));
    coordinatesForGroupElement.push(
      new Coordinates(this.boundingBox.minX, this.boundingBox.maxY),
    );

    coordinatesForGroupElement.forEach((coordinatesElement) => {
      coordinatesElement.x += presentationProperties.shiftX;
    });

    var element = new SvgPolygon();
    element.dataPoints = coordinatesForGroupElement;
    element.id =
      ID_PREFIX_GROUP_ELEMENT +
      ID_SEPERATOR +
      ID_TYPE_GROUP_ELEMENT +
      ID_KV_SEPERATOR +
      this.name;
    element.stroke = 'white';

    element.fill = presentationProperties.palette
      .getColorFor(new ElementId(element.id))
      .toString();

    if (
      panelOptions.selectedChart !== undefined &&
      panelOptions.selectedChart.active
    ) {
      panelOptions.selectedChart.updatePositionForGroup(
        this.name,
        this.boundingBox.minX,
        this.boundingBox.maxY,
      );
      if (
        panelOptions.selectedChart.type == SelectionType.Group &&
        panelOptions.selectedChart.value == this.name &&
        panelOptions.selectedChart.currentColor !== undefined
      ) {
        element.fill = panelOptions.selectedChart.currentColor;
      }
    }

    element.onClick = getOnClickHandlerForGroupBounds(
      this.name,
      this.boundingBox,
      panelOptions,
      element.fill,
      presentationProperties.onOptionsChange,
    );
    element.zOrder = ZORDER_GROUP_BOUNDS;

    return element;
  }

  private toLabel(
    presentationProperties: ChartGroupPresentationProperties,
    textSize: number,
    selection: Selection | undefined,
  ): SvgElement {
    var groupLabel = new SvgText();
    groupLabel.id =
      ID_PREFIX_LINE_ELEMENT +
      ID_SEPERATOR +
      ID_TYPE_GROUP_ELEMENT +
      ID_KV_SEPERATOR +
      this.name;
    groupLabel.class = GROUP_LABEL_CLASS;
    groupLabel.text = this.name;
    groupLabel.textSize = textSize;
    groupLabel.x = GROUP_LABEL_MARGIN_X + presentationProperties.shiftX;
    groupLabel.y = this.boundingBox.minY - GROUP_LABEL_MARGIN_Y;
    groupLabel.fill = presentationProperties.palette
      .getColorFor(new ElementId(groupLabel.id))
      .toString();
    groupLabel.zOrder = ZORDER_GROUP_LABEL;

    groupLabel.fillOpacity = 1;
    if (
      selection !== undefined &&
      selection.active &&
      selection.type === SelectionType.Group
    ) {
      if (selection.value != this.name) {
        groupLabel.fillOpacity = 0.1;
      }
    }

    return groupLabel;
  }
}
