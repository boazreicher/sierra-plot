import { BasicPalette } from 'colors/BasicPalette';
import { ChartData } from 'charts/ChartData';
import { Color } from 'colors/Color';
import { ColorPalette } from 'colors/ColorPalette';
import { ColorPalettes, PaletteType } from 'colors/ColorPalettes';
import { hexToHsl } from 'colors/ColorUtils';
import { HSL } from 'colors/HSL';
import { PredefinedColorMap } from 'colors/PredefinedColorMap';
import { SelectionType } from 'data/Selection';
import { ColorMode, ColorType, SierraPlotOptions } from 'types';
import { ElementId } from 'data/ElementId';

export class PaletteGenerator {
  private seriesPalette: ColorPalette;
  private groupPalette: ColorPalette;
  private totalColor: Color;

  constructor(seriesPalette: ColorPalette, groupPalette: ColorPalette, totalColor: Color) {
    this.seriesPalette = seriesPalette;
    this.groupPalette = groupPalette;
    this.totalColor = totalColor;
  }

  generatePalettes(sortedCharts: ChartData[], panelOptions: SierraPlotOptions): ColorPalettes {
    this.seriesPalette.reset();
    this.groupPalette.reset();

    let colorPalettes: ColorPalettes = new ColorPalettes();

    colorPalettes.addPalette(
      PaletteType.Regular,
      this.generatePalette(
        panelOptions.labelColor,
        sortedCharts,
        panelOptions.color,
        panelOptions.colorType,
        panelOptions.colorMode
      )
    );
    let selectedValue: string | undefined = undefined;
    if (
      panelOptions.selectedChart !== undefined &&
      panelOptions.selectedChart.active &&
      panelOptions.selectedChart.type === SelectionType.Group
    ) {
      selectedValue = panelOptions.selectedChart.value;
    }

    colorPalettes.addPalette(
      PaletteType.Selected,
      this.generatePalette(
        panelOptions.labelColor,
        sortedCharts,
        panelOptions.color,
        panelOptions.colorType,
        panelOptions.colorMode,
        selectedValue
      )
    );

    return colorPalettes;
  }

  private generatePalette(
    labelColor: string,
    sortedChartsSeries: ChartData[],
    colorString: string,
    colorType: ColorType,
    colorMode: ColorMode,
    selectedValue: string | undefined = undefined
  ): ColorPalette {
    let chartPalette: BasicPalette =
      selectedValue !== undefined
        ? this.generatePaletteForSelectedCharts(sortedChartsSeries, selectedValue)
        : this.generatePaletteForCharts(colorString, colorType, this.getSizeOfLargestGroup(sortedChartsSeries));

    let palette: PredefinedColorMap = new PredefinedColorMap(
      this.totalColor,
      hexToHsl(labelColor),
      this.groupPalette,
      chartPalette,
      this.seriesPalette
    );

    sortedChartsSeries.forEach((chart) => {
      chartPalette.resetIfDifferent(chart.sortKey);
      chart.data.forEach((element) => {
        if (element.name !== undefined) {
          palette.addKey(
            new ElementId(element.name),
            selectedValue === undefined ? colorMode : 'regular',
            selectedValue !== undefined
          );
        }
      });
    });

    return palette;
  }

  private getSizeOfLargestGroup(sortedChartsSeries: ChartData[]): number {
    let groupSizes: Record<string, number> = {};
    sortedChartsSeries.forEach((chartData) => {
      if (chartData.sortKey !== undefined) {
        if (!groupSizes.hasOwnProperty(chartData.sortKey)) {
          groupSizes[chartData.sortKey] = 0;
        }
        groupSizes[chartData.sortKey] += 1;
      }
    });
    let result = 0;
    for (let group in groupSizes) {
      if (result < groupSizes[group]) {
        result = groupSizes[group];
      }
    }
    return result;
  }

  private generatePaletteForSelectedCharts(sortedChartsSeries: ChartData[], selectedValue: string): BasicPalette {
    let chartPalette: BasicPalette = new BasicPalette();

    let numCharts = 0;
    sortedChartsSeries.forEach((chart) => {
      if (chart.sortKey === selectedValue) {
        numCharts++;
      }
    });
    for (let hue = 0; hue <= 360 * (1 - 1 / numCharts); hue += 360 / numCharts) {
      chartPalette.addColor(new HSL(hue, 50, 50));
    }

    return chartPalette;
  }

  private generatePaletteForCharts(colorString: string, colorType: ColorType, charts: number): BasicPalette {
    let chartPalette: BasicPalette = new BasicPalette();

    let chartColor: HSL = hexToHsl(colorString);
    chartPalette.addColor(chartColor);

    let cappedSteps = charts;
    switch (colorType) {
      case 'alternating':
        cappedSteps = 2;
        break;
      case 'single':
        cappedSteps = 1;
        break;
    }

    if (cappedSteps > 1) {
      let step: number = (80 - chartColor.l) / (cappedSteps - 1);
      step = Math.min(step, 20);
      for (let index = 1; index < cappedSteps; index++) {
        let stepped: Color = chartColor.clone();

        stepped.increaseLuminance(step * index);
        chartPalette.addColor(stepped);
      }
    }

    return chartPalette;
  }
}
