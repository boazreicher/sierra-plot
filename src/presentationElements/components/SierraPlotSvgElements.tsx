import { compareByZOrder } from 'charts/ChartUtils';
import { ChartsSvgElements } from 'data/ChartsSvgElements';
import * as React from 'react';
import { SierraPlotSvgElement } from './SierraPlotSvgElement';

export const SierraPlotSvgElements = ({
  ...props
}: React.SVGProps<SVGElement> & { chartsSvgElements: ChartsSvgElements }) => createElements(props.chartsSvgElements);

function createElements(chartsSvgElements: ChartsSvgElements) {
  return (
    <>
      {chartsSvgElements
        .getAllElements()
        .sort(compareByZOrder)
        .map((element) => (
          <SierraPlotSvgElement key={element.getKey()} element={element} height={undefined} />
        ))}
    </>
  );
}
