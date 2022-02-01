import { DragEventHandler, MouseEventHandler, WheelEventHandler } from 'react';
import { BoundingBox, ChartType, ColorMode, Coordinates } from 'types';
import { Selection, SelectionType } from 'data/Selection';
import { ID_KV_SEPERATOR, NO_COLOR } from 'Constants';
import { ToolTipData } from 'data/ToolTipData';

export abstract class SvgElement {
  id: string | undefined;
  class: string | undefined;
  // Probably need to revisit the naming distinction between "DataPoints" and "Coordinates"
  dataPoints: Coordinates[] = [];
  fill = NO_COLOR;
  stroke: string | undefined;
  strokeWidth = 1;
  order = -1;
  boundingBox: BoundingBox = new BoundingBox();
  opacity = 1;
  fillOpacity = 1;
  strokeOpacity = 1;
  x: number | undefined;
  y: number | undefined;
  text: string | undefined;
  textSize = 50;
  title: string | undefined;
  onClick: MouseEventHandler | undefined;
  onDoubleClick: MouseEventHandler | undefined;
  onMouseOver: MouseEventHandler | undefined;
  onMouseLeave: MouseEventHandler | undefined;
  onWheel: WheelEventHandler | undefined;
  onDrag: DragEventHandler | undefined;

  zOrder = 0;

  isChartGroup = false;
  isFogElement = false;

  filter: string | undefined;
  sortKey: string | undefined;

  colorMode: ColorMode = 'regular';

  // Maximum height that the chart can occupy
  // Used for aligning gradient fill scales
  maxHeight: number | undefined;

  children: SvgElement[] = [];

  tooltipData: ToolTipData = new ToolTipData();

  abstract calculateBoundingBox(chartType: ChartType): void;

  abstract includedInParentBoundingBox(chartType: ChartType): boolean;

  abstract getPointsAsString(height?: number | undefined): string;

  abstract isGroup(): boolean;

  abstract buildElement(height?: number | undefined): JSX.Element;

  abstract hasDataPoints(): boolean;

  isHighlighted(selection: Selection): boolean {
    if (selection !== undefined && selection.active) {
      let selectedId = selection.key + ID_KV_SEPERATOR + selection.value;
      if (selection.type === SelectionType.Chart && selectedId === this.id) {
        return true;
      } else if (selection.type === SelectionType.Group && selection.value === this.sortKey) {
        return true;
      }
    }
    return false;
  }
}
