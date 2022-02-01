import { ChartArea } from 'charts/ChartArea';
import { CLICKABLE_CLASS } from 'Constants';
import { ChartsSvgElements } from 'data/ChartsSvgElements';
import * as React from 'react';
import { optionsChangeCallback, SierraPlotOptions } from 'types';
import { getStyleObj } from './Utils';

export const Gear = ({
  ...props
}: React.SVGProps<SVGElement> & { chartsSvgElements: ChartsSvgElements } & {
  panelOptions: SierraPlotOptions;
} & { onOptionsChange: optionsChangeCallback }) =>
  createGear(props.chartsSvgElements, props.panelOptions, props.onOptionsChange);

function createGear(
  chartsSvgElements: ChartsSvgElements,
  panelOptions: SierraPlotOptions,
  onOptionsChange: optionsChangeCallback
) {
  let area = new ChartArea(chartsSvgElements.getChartsElements());
  let startX = area.topRight.x;
  let startY = area.bottomLeft.y;

  return (
    <svg
      id="gear"
      version="1.1"
      width="210"
      height="297"
      viewBox="0 0 210 297"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      x={startX - 100}
      y={getGearYPosition(startY, panelOptions.showControlElements, panelOptions.showRangeSelector)}
    >
      <g
        className={CLICKABLE_CLASS}
        onClick={getGearOnClickHandler(panelOptions, onOptionsChange)}
        transform="matrix(1.4008083,0,0,1.3930514,49.749686,49.997335)"
        id="g3249"
        style={getStyleObj('fill:#9d9d9d;fill-opacity:1')}
      >
        <path
          style={getStyleObj('fill:#9d9d9d;fill-opacity:1;stroke:#000000;stroke-width:0.264583')}
          d="m 27.2162,-2.90992 3.71,-0.39667 0.4831,0.00534 4.3305,1.34454 v 3.91342 l -4.3305,1.34454 -0.4831,0.00534 -3.71,-0.39667 -1.1694,5.50157 3.5506,1.14663 0.4392,0.20135 3.4092,2.98963 -1.5918,3.5751 -4.5029,-0.533 -0.4435,-0.1916 -3.2279,-1.8714 -3.306,4.5503 2.7773,2.4916 0.3192,0.3626 1.8985,4.1178 -2.9082,2.6186 -3.8969,-2.3185 -0.3272,-0.3554 -2.1877,-3.0225 -4.8709,2.8122 1.5237,3.4059 0.1442,0.4611 0.0594,4.534 L 9.18325,34.5952 6.56633,30.8922 6.41198,30.4344 5.64278,26.7834 0.04911,27.3713 0.0558,31.1025 0,31.5823 l -1.78983,4.1662 -3.89199,-0.4091 -0.88451,-4.4472 0.04519,-0.481 0.7823,-3.6482 -5.34926,-1.7381 -1.5114,3.4113 -0.2462,0.4157 -3.3296,3.078 -3.3891,-1.9567 1.0008,-4.4226 0.2369,-0.421 2.1985,-3.0146 -4.1798,-3.7635 -2.7683,2.5016 -0.3939,0.2796 -4.2938,1.4576 -2.3002,-3.166 2.7131,-3.6331 0.3877,-0.2883 3.2346,-1.8598 -2.2877,-5.1382 -3.5465,1.15936 -0.4736,0.09521 -4.5153,-0.4148 -0.8137,-3.82791 3.9563,-2.21551 0.4714,-0.10565 3.7114,-0.38336 v -5.62448 l -3.7114,-0.38336 -0.4714,-0.10565 -3.9563,-2.21551 0.8137,-3.82791 4.5153,-0.4148 0.4736,0.09521 3.5465,1.15936 2.2877,-5.1382 -3.2346,-1.8598 -0.3877,-0.2883 -2.7131,-3.6331 2.3002,-3.166 4.2938,1.4576 0.3939,0.2796 2.7683,2.5016 4.1798,-3.7635 -2.1985,-3.0146 -0.2369,-0.421 -1.0008,-4.4226 3.3891,-1.9567 3.3296,3.078 0.2462,0.4157 1.5114,3.4113 5.34926,-1.7381 -0.7823,-3.6482 -0.04519,-0.481 0.88451,-4.4472 3.89199,-0.4091 1.78983,4.1662 0.0558,0.4798 -0.00669,3.7312 5.59367,0.5879 0.7692,-3.651 0.15435,-0.4578 2.61692,-3.703 3.72185,1.2093 -0.0594,4.534 -0.1442,0.4611 -1.5237,3.4059 4.8709,2.8122 2.1877,-3.0225 0.3272,-0.3554 3.8969,-2.3185 2.9082,2.6186 -1.8985,4.1178 -0.3192,0.3626 -2.7773,2.4916 3.306,4.5503 3.2279,-1.8714 0.4435,-0.1916 4.5029,-0.533 1.5918,3.5751 -3.4092,2.98963 -0.4392,0.20135 -3.5506,1.14663 z"
          id="path3245"
        />
        <circle
          style={getStyleObj('fill:#9d9d9d;fill-opacity:1;stroke:#000000;stroke-width:0.264583')}
          id="path3247"
          cx="0"
          cy="0"
          r="2.5929167"
        />
      </g>
    </svg>
  );
}

function getGearYPosition(startY: number, showControlElements: boolean, showRangeSelector: boolean): number {
  let result = showControlElements ? startY - 555 : startY - 100;
  return showRangeSelector ? result + 150 : result;
}

function getGearOnClickHandler(
  panelOptions: SierraPlotOptions,
  onOptionsChange: optionsChangeCallback
): React.MouseEventHandler<SVGSVGElement> | undefined {
  var clickEventHandler: React.MouseEventHandler = (event) => {
    panelOptions.showControlElements = !panelOptions.showControlElements;
    event.preventDefault();
    event.stopPropagation();
    onOptionsChange(panelOptions);
  };
  return clickEventHandler;
}
