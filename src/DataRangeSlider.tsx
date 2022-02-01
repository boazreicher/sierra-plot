import React, { RefObject } from 'react';

import RangeSlider from 'data-driven-range-slider';
import { optionsChangeCallback, SierraPlotOptions } from 'types';
import { SierraPlotProperties } from 'data/SierraPlotProperties';

interface Props {
  data: string[];
  onOptionsChange: optionsChangeCallback;
  sierraPlotProperties: SierraPlotProperties;
  panelOptions: SierraPlotOptions;
}

interface State {
  selectedRange: Date[];
  selectedData: string[];
}

class RangeSliderComponent extends React.Component<Props, State> {
  state: State;
  nodeRef: RefObject<SVGSVGElement> = React.createRef();
  chart: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRange: [],
      selectedData: [],
    };

    if (props.panelOptions.showRangeSelector) {
      this.createDiagram = this.createDiagram.bind(this);
    }
  }

  componentDidMount() {
    if (this.props.panelOptions.showRangeSelector) {
      this.createDiagram();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.data === this.props.data || !this.props.panelOptions.showRangeSelector) {
      return;
    }
    this.createDiagram();
  }

  render() {
    return this.props.panelOptions.showRangeSelector ? (
      <svg
        x={getXAxisStartX(this.props.sierraPlotProperties.minX, this.props.sierraPlotProperties.dimensions.startX)}
        y={getXAxisYPos(
          this.props.sierraPlotProperties.dimensions.height,
          this.props.sierraPlotProperties.dimensions.startY
        )}
        height="100%"
        style={{
          marginTop: '0px',
          borderRadius: '5px',
          paddingTop: '0px',
          paddingLeft: '0px',
        }}
        ref={this.nodeRef}
      />
    ) : (
      <></>
    );
  }

  createDiagram() {
    const node = this.nodeRef.current;
    if (!this.props.data) {
      return;
    }
    if (!this.chart) {
      this.chart = new RangeSlider();
    }
    this.chart
      .container(node)
      .svgWidth(
        getXAxisWidth(
          this.props.sierraPlotProperties.minX,
          this.props.sierraPlotProperties.dimensions.startX,
          this.props.sierraPlotProperties.chartDimensions.width
        )
      )
      .svgHeight(100)
      .yTicks(0)
      .data(this.props.data)
      .accessor((d: string | number | Date) => new Date(d))
      .onBrush((d: { range: Date[]; data: string[] }) => {
        this.props.panelOptions.timeRangeStart = d.range[0].getTime();
        this.props.panelOptions.timeRangeEnd = d.range[1].getTime();
        this.props.onOptionsChange(this.props.panelOptions);
        this.setState({
          selectedRange: d.range,
          selectedData: d.data,
        });
      })
      .render();
  }
}

function getXAxisYPos(yPos: number, topMargin: number) {
  return yPos + topMargin + 100;
}

export default RangeSliderComponent;

function getXAxisStartX(minX: number, startX: number): number {
  return minX + startX - 30;
}
function getXAxisWidth(minX: number, startX: number, width: number): number {
  return width - minX;
}
