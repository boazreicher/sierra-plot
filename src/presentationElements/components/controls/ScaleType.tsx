import { CLICKABLE_CLASS } from 'Constants';
import { optionsChangeCallback, SierraPlotOptions } from 'types';
import * as React from 'react';
import { getStyleObj } from './Utils';

export function ScaleType(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g onClick={getScaleTypeOnClickHandler(panelOptions, onOptionsChange)} className={CLICKABLE_CLASS}>
      <rect
        onClick={getScaleTypeOnClickHandler(panelOptions, onOptionsChange)}
        className={CLICKABLE_CLASS}
        style={getStyleObj(
          'fill:url(#linearGradient1093);fill-opacity:1;stroke:#000000;stroke-width:0.735;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'
        )}
        id="btn_scale_type"
        width="25.262375"
        height="25.262375"
        x="75.034904"
        y="72.686546"
      />
      <path
        style={getStyleObj(
          'fill:none;stroke:#000000;stroke-width:1.567;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'
        )}
        d="m 88.057091,75.991502 h -9.61766 V 94.77822 h 9.74763"
        id="btn_scale_type_icon"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:11.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="84.150009"
        y="89.962639"
        id="btn_scale_type_label"
      >
        <tspan
          id="tspan12002-2"
          style={getStyleObj('font-size:11.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="84.150009"
          y="89.962639"
        >
          {getScaleTypeLabel(panelOptions)}
        </tspan>
      </text>
    </g>
  );
}

function getScaleTypeOnClickHandler(
  panelOptions: SierraPlotOptions,
  onOptionsChange: optionsChangeCallback
): React.MouseEventHandler<SVGElement> | undefined {
  var clickEventHandler: React.MouseEventHandler = (event) => {
    switch (panelOptions.maxYType) {
      case 'global':
        panelOptions.maxYType = 'group';
        break;
      case 'group':
        panelOptions.maxYType = 'local';
        break;
      case 'local':
        panelOptions.maxYType = 'total';
        break;
      case 'total':
        panelOptions.maxYType = 'global';
        break;
    }

    event.preventDefault();
    event.stopPropagation();
    onOptionsChange(panelOptions);
  };
  return clickEventHandler;
}
function getScaleTypeLabel(panelOptions: SierraPlotOptions): string {
  switch (panelOptions.maxYType) {
    case 'global':
      return 'A';
    case 'group':
      return 'G';
    case 'local':
      return 'L';
    case 'total':
      return 'T';
  }
}
