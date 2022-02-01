import { Color } from 'colors/Color';
import { RGB } from 'colors/RGB';
import { CLICKABLE_CLASS } from 'Constants';
import * as React from 'react';
import { ChartBreakdown, optionsChangeCallback, SierraPlotOptions, TotalBreakdown } from 'types';
import { getStyleObj } from './Utils';

export function TotalTotal(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g onClick={getTotalTypeOnClickHandler(panelOptions, onOptionsChange, 'none')} className={CLICKABLE_CLASS}>
      <path
        id="btn_total_total"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient14874)',
              new RGB(102, 51, 153),
              panelOptions.totalBreakdown !== 'none'
            ) +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 47.259476,103.76086 -2.87388,1.13057 -1.38428,-1.2178 -4.36675,1.56272 -3.419811,-1.80602 -4.86895,1.83797 -3.610138,-0.13349 v 0 l -2.941426,-1.21737 -2.595708,-1.2178 -3.460826,0.99947 -3.287711,0.94867 -5.9782994,-1.19031 -3.2390942,4.08027 v 20.20108 H 54.823183 v -20.05783 l -1.612768,-1.81541 -3.633706,1.2178 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:11.7238px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="26.161543"
        y="121.23445"
        id="text22498"
      >
        <tspan
          id="tspan22496"
          style={getStyleObj('font-size:11.7238px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="26.161543"
          y="121.23445"
        >
          T
        </tspan>
      </text>
    </g>
  );
}

export function TotalGroup(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g className={CLICKABLE_CLASS} onClick={getTotalTypeOnClickHandler(panelOptions, onOptionsChange, 'group')}>
      <path
        id="btn_total_group1"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient14872)',
              new RGB(144, 88, 200),
              panelOptions.totalBreakdown !== 'group'
            ) +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 97.109114,104.7971 -3.132943,0.0943 -1.38428,-1.2178 -4.366749,1.56271 -3.549336,-0.76977 -4.739425,-0.10499 -3.610138,0.77322 v 0 l -2.941426,-1.21737 -2.725233,0.59562 -3.331302,-0.81394 -3.676298,-0.86476 -5.39541,1.46505 -3.433391,3.23834 v 20.20108 h 49.590577 v -20.05783 l -1.61277,-1.81541 -2.856517,-0.33656 z"
      />
      <path
        id="btn_total_group2"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient14911)',
              new RGB(102, 51, 153),
              panelOptions.totalBreakdown !== 'group'
            ) +
            ';fill-opacity:1;stroke:#181818;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 96.895844,115.16404 -2.873881,1.13058 -1.796449,-0.48506 -3.95458,0.82997 -3.419811,-1.80602 -5.00634,0.96784 -3.472748,0.73664 v 0 l -2.941426,-1.21737 -2.59571,-1.21781 -3.552423,1.50324 -3.470892,-0.0588 -5.016578,0.45834 -3.926031,2.93538 -0.04579,8.7979 49.773765,-0.0687 -0.1375,-8.58596 -1.61277,-1.8154 -3.175738,-0.56824 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="69.828011"
        y="113.57953"
        id="text22498-2"
      >
        <tspan
          id="tspan22496-2"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="69.828011"
          y="113.57953"
        >
          G1
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="78.709389"
        y="125.42892"
        id="text22498-2-4"
      >
        <tspan
          id="tspan22496-2-5"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="78.709389"
          y="125.42892"
        >
          G2
        </tspan>
      </text>
    </g>
  );
}

export function TotalChart(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g className={CLICKABLE_CLASS} onClick={getTotalTypeOnClickHandler(panelOptions, onOptionsChange, 'chart')}>
      <path
        id="btn_total_chart1"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient14817)',
              new RGB(144, 88, 200),
              panelOptions.totalBreakdown !== 'chart'
            ) +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 146.44063,103.76086 -2.87388,1.13057 -1.38428,-1.2178 -4.36675,1.56272 -3.41981,-1.80602 -4.86895,1.83797 -3.61014,-0.13349 v 0 l -2.94142,-1.21737 -2.59571,-1.21781 -3.46083,0.99948 -3.28771,0.94867 -5.9783,-1.19032 -3.23909,4.08028 v 20.20108 h 49.59058 v -20.05783 l -1.61277,-1.81541 -2.46793,-2.92717 z"
      />
      <path
        id="btn_total_chart2"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient15852)',
              new RGB(102, 51, 153),
              panelOptions.totalBreakdown !== 'chart'
            ) +
            ';fill-opacity:1;stroke:#181818;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 146.76125,116.8356 -2.96548,-0.60967 -1.79645,-0.48505 -3.40504,1.83747 -4.24413,-0.52372 -4.73156,-1.32197 v 0 l -3.56435,-1.82792 -2.84983,1.3472 -2.50411,0.0645 -3.64402,0.22095 -3.47089,1.95618 -5.10817,-0.36599 -3.92603,-3.47605 0.0458,14.01864 49.77377,-0.0687 -0.32062,-8.66059 -1.42965,-1.74077 -2.80938,-1.94212 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="118.73431"
        y="112.994"
        id="text22498-2-0"
      >
        <tspan
          id="tspan22496-2-50"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="118.73431"
          y="112.994"
        >
          C1
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="128.82594"
        y="126.08133"
        id="text22498-2-0-2"
      >
        <tspan
          id="tspan22496-2-50-5"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="128.82594"
          y="126.08133"
        >
          C2
        </tspan>
        <tspan
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="128.82594"
          y="138.29358"
          id="tspan47744"
        />
      </text>
    </g>
  );
}

export function TotalSeries(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g className={CLICKABLE_CLASS} onClick={getTotalTypeOnClickHandler(panelOptions, onOptionsChange, 'series')}>
      <path
        id="btn_total_series1"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient13443)',
              new RGB(144, 88, 200),
              panelOptions.totalBreakdown !== 'series',
              seriesDisabled(panelOptions)
            ) +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 196.09598,104.73233 -2.93865,0.1591 -1.64334,-0.44062 -4.10769,0.78554 -3.29028,-0.76979 -4.99848,0.80174 -3.61014,-0.13349 v 0 l -2.94142,-1.21738 -2.72523,-0.37586 -3.33131,0.15754 -3.2877,0.94866 -5.97831,-1.19032 -3.23909,4.08029 v 20.20108 h 49.59058 v -20.05783 l -1.61277,-1.81541 -2.53269,-2.02046 z"
      />
      <path
        id="btn_total_series2"
        style={getStyleObj(
          'fill:' +
            getTotalChartColor(
              'url(#linearGradient16137)',
              new RGB(102, 51, 153),
              panelOptions.totalBreakdown !== 'series',
              seriesDisabled(panelOptions)
            ) +
            ';fill-opacity:1;stroke:#181818;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 196.07703,115.16404 -2.87388,1.13058 -1.86121,0.22735 -3.88982,0.11756 -3.41981,-1.80602 -4.74728,0.0611 -3.7318,1.64335 v 0 l -2.94143,-1.21737 -2.79001,1.89092 -3.35812,-1.60528 -3.47089,-0.0589 -5.01658,0.9117 -3.96323,0.44982 -0.008,10.8301 49.77377,-0.0687 -0.1375,-10.20508 -1.41848,-1.03823 -3.37004,0.27371 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="168.2032"
        y="113.64641"
        id="text22498-2-0-9"
      >
        <tspan
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="168.2032"
          y="113.64641"
          id="tspan49160"
        >
          S1
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="179.21329"
        y="125.69274"
        id="text22498-2-0-5"
      >
        <tspan
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="179.21329"
          y="125.69274"
          id="tspan50831"
        >
          S2
        </tspan>
      </text>
    </g>
  );
}

export function ChartChart(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g onClick={getChartBreakdownTypeOnClickHandler(panelOptions, onOptionsChange, 'none')} className={CLICKABLE_CLASS}>
      <path
        id="btn_chart_chart"
        style={getStyleObj(
          'fill:' +
            getChartColor(new RGB(102, 51, 153), panelOptions.chartBreakdownType == 'series') +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 146.21095,73.97096 -2.87388,1.130576 -1.38427,-1.217799 -4.36676,1.562712 -3.41981,-1.80603 -4.86895,1.837975 -3.61014,-0.133484 v 0 l -2.94142,-1.217383 -2.59571,-1.217798 -3.46083,0.999473 -3.28771,0.948669 -5.9783,-1.190313 -3.23909,4.080284 v 20.201077 h 49.59058 v -20.05783 l -1.61277,-1.815406 -3.6337,1.217798 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:11.7238px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="125.11302"
        y="91.44455"
        id="text22498-5"
      >
        <tspan
          id="tspan22496-0"
          style={getStyleObj('font-size:11.7238px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="125.11302"
          y="91.44455"
        >
          C
        </tspan>
      </text>
    </g>
  );
}

export function ChartSeries(panelOptions: SierraPlotOptions, onOptionsChange: optionsChangeCallback) {
  return (
    <g
      onClick={getChartBreakdownTypeOnClickHandler(panelOptions, onOptionsChange, 'series')}
      className={CLICKABLE_CLASS}
    >
      <path
        id="btn_chart_series1"
        style={getStyleObj(
          'fill:' +
            getChartColor(
              new RGB(144, 88, 200),
              panelOptions.chartBreakdownType !== 'series',
              seriesDisabled(panelOptions)
            ) +
            ';fill-opacity:1;stroke:#0f0f0f;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 196.0606,75.007196 -3.13295,0.0943 -1.38428,-1.217799 -4.36674,1.562713 -3.54934,-0.76978 -4.73943,-0.10496 -3.61013,0.773214 v 0 l -2.94143,-1.217369 -2.72524,0.595613 -3.33129,-0.813938 -3.6763,-0.864756 -5.39541,1.46505 -3.4334,3.238346 v 20.201077 h 49.59058 V 77.891074 l -1.61277,-1.815405 -2.85651,-0.336564 z"
      />
      <path
        id="btn_chart_series2"
        style={getStyleObj(
          'fill:' +
            getChartColor(
              new RGB(102, 51, 153),
              panelOptions.chartBreakdownType !== 'series',
              seriesDisabled(panelOptions)
            ) +
            ';fill-opacity:1;stroke:#181818;stroke-width:0.735;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:0.0735,0.0735;stroke-dashoffset:0;stroke-opacity:1;paint-order:normal'
        )}
        d="m 195.84733,85.374137 -2.87389,1.130576 -1.79644,-0.485059 -3.95458,0.829973 -3.41981,-1.806018 -5.00635,0.967834 -3.47274,0.736644 v 0 l -2.94143,-1.217369 -2.59571,-1.217812 -3.55242,1.50324 -3.47089,-0.05885 -5.01658,0.458334 -3.92604,2.935389 -0.0459,8.7979 49.77378,-0.06868 -0.1375,-8.585958 -1.61277,-1.815406 -3.17574,-0.568237 z"
      />
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="168.77953"
        y="83.789627"
        id="text22498-2-2"
      >
        <tspan
          id="tspan22496-2-3"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="168.77953"
          y="83.789627"
        >
          S1
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        style={getStyleObj(
          'font-style:normal;font-weight:normal;font-size:9.76979px;line-height:1.25;font-family:sans-serif;fill:#cec6c6;fill-opacity:1;stroke:none;stroke-width:0.366367'
        )}
        x="177.66089"
        y="95.639015"
        id="text22498-2-4-3"
      >
        <tspan
          id="tspan22496-2-5-1"
          style={getStyleObj('font-size:9.76979px;fill:#cec6c6;fill-opacity:1;stroke-width:0.366367')}
          x="177.66089"
          y="95.639015"
        >
          S2
        </tspan>
      </text>
    </g>
  );
}

function getChartBreakdownTypeOnClickHandler(
  panelOptions: SierraPlotOptions,
  onOptionsChange: optionsChangeCallback,
  type: ChartBreakdown
): React.MouseEventHandler<SVGPolygonElement> | undefined {
  var clickEventHandler: React.MouseEventHandler = (event) => {
    panelOptions.chartBreakdownType = type;
    if (type == 'none') {
      if (panelOptions.totalBreakdown == 'series') {
        panelOptions.totalBreakdown = 'chart';
      }
    }
    event.preventDefault();
    event.stopPropagation();
    onOptionsChange(panelOptions);
  };
  return clickEventHandler;
}

function getChartColor(color: Color, greyOut: boolean, disabled = false): string {
  if (greyOut) {
    if (disabled) {
      return 'url(#linearGradient53236)';
    }
    return 'url(#linearGradient53236)';
  }
  return color.toString();
}

function seriesDisabled(panelOptions: SierraPlotOptions): boolean {
  return panelOptions.seriesFieldBreakdown === undefined || panelOptions.chartBreakdownType !== 'series';
}

function getTotalChartColor(original: string, color: Color, greyOut: boolean, disabled = false): string {
  if (greyOut) {
    if (disabled) {
      return '#2A2A2A';
    }
    return original;
  }
  return color.toString();
}

function getTotalTypeOnClickHandler(
  panelOptions: SierraPlotOptions,
  onOptionsChange: optionsChangeCallback,
  type: TotalBreakdown
): React.MouseEventHandler<SVGElement> | undefined {
  var clickEventHandler: React.MouseEventHandler = (event) => {
    if (type == 'series' && seriesDisabled(panelOptions)) {
      console.log('Button is disabled.  No series data available');
      return;
    }
    panelOptions.totalBreakdown = type;
    event.preventDefault();
    event.stopPropagation();
    onOptionsChange(panelOptions);
  };
  return clickEventHandler;
}
