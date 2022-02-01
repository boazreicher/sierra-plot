import { PanelPlugin } from '@grafana/data';
import { SierraPlotOptions } from './types';
import { SierraPlotPanel } from './SierraPlotPanel';
import { LabelSelector } from 'inputs/LabelSelector';
import { FieldSelector } from 'inputs/FieldSelector';
import { OptionalFieldSelector } from 'inputs/OptionalFieldSelector';
import { GroupsSelector } from 'inputs/GroupsSelector';
import { SeriesSelector } from 'inputs/SeriesSelector';

export const plugin = new PanelPlugin<SierraPlotOptions>(
  SierraPlotPanel
).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'amplitudeField',
      path: 'amplitudeField',
      name: 'Amplitude',
      description: 'Field for series values',
      category: ['Fields'],
      editor: FieldSelector
    })
    .addCustomEditor({
      id: 'chartsFieldBreakdown',
      path: 'chartsFieldBreakdown',
      name: 'Breakdown',
      description: 'Field for chart breakdown',
      category: ['Fields'],
      editor: LabelSelector
    })
    .addCustomEditor({
      id: 'chartsGroupField',
      path: 'chartsGroupField',
      name: 'Group',
      description: 'Field for grouping charts',
      category: ['Fields'],
      editor: LabelSelector
    })
    .addCustomEditor({
      id: 'weightField',
      path: 'weightField',
      name: 'Weight',
      description: 'Field for series weights',
      category: ['Fields [Advanced]'],
      editor: OptionalFieldSelector
    })
    .addCustomEditor({
      id: 'seriesFieldBreakdown',
      path: 'seriesFieldBreakdown',
      name: 'Series Breakdwon',
      description: 'Field for series breakdown',
      category: ['Fields [Advanced]'],
      editor: LabelSelector
    })
    .addCustomEditor({
      id: 'selectedSeries',
      path: 'selectedSeries',
      name: 'Series Values',
      category: ['Fields [Advanced]'],
      defaultValue: ['*'],
      editor: SeriesSelector
    })
    .addCustomEditor({
      id: 'excludedSeries',
      path: 'excludedSeries',
      name: 'Series Values to Exclude',
      category: ['Fields [Advanced]'],
      defaultValue: [''],
      editor: SeriesSelector
    })
    .addCustomEditor({
      id: 'selectedGroups',
      path: 'selectedGroups',
      name: 'Group Values',
      category: ['Fields [Advanced]'],
      defaultValue: ['*'],
      editor: GroupsSelector
    })
    .addCustomEditor({
      id: 'excludedGroups',
      path: 'excludedGroups',
      name: 'Group Values to Exclude',
      category: ['Fields [Advanced]'],
      defaultValue: [''],
      editor: GroupsSelector
    })
    .addRadio({
      path: 'sortMode',
      name: 'Sort Mode',
      defaultValue: 'lex',
      settings: {
        options: [
          {
            value: 'lex',
            label: 'Lex'
          },
          {
            value: 'max',
            label: 'Max'
          },
          {
            value: 'sum',
            label: 'Sum'
          }
        ]
      },
      category: ['Series']
    })
    .addRadio({
      path: 'chartType',
      name: 'Chart Type',
      defaultValue: 'area',
      settings: {
        options: [
          {
            value: 'area',
            label: 'Area'
          },
          {
            value: 'line',
            label: 'Line'
          }
        ]
      },
      category: ['Series']
    })
    .addBooleanSwitch({
      path: 'stepped',
      name: 'Stepped Area Chart',
      defaultValue: false,
      category: ['Series']
    })
    .addRadio({
      path: 'aggregation',
      name: 'Aggregation',
      defaultValue: 'sum',
      settings: {
        options: [
          {
            value: 'sum',
            label: 'Sum'
          },
          {
            value: 'avg',
            label: 'Average'
          }
        ]
      },
      category: ['Series']
    })
    .addRadio({
      path: 'maxYType',
      name: 'Max Y Type',
      defaultValue: 'global',
      settings: {
        options: [
          {
            value: 'global',
            label: 'Global'
          },
          {
            value: 'total',
            label: 'Total'
          },
          {
            value: 'local',
            label: 'Local'
          },
          {
            value: 'group',
            label: 'Group'
          }
        ]
      },
      category: ['Series']
    })

    .addSliderInput({
      path: 'skewPercentage',
      name: 'Skew Percent',
      defaultValue: 10,
      settings: {
        min: 0,
        max: 20,
        step: 0.01
      },
      category: ['Series']
    })

    .addSliderInput({
      path: 'scaleY',
      name: 'Scale Y',
      defaultValue: 100,
      settings: {
        min: 0,
        max: 10000,
        step: 1
      },
      category: ['Series']
    })
    .addRadio({
      path: 'totalChartType',
      name: 'Chart Type',
      defaultValue: 'area',
      settings: {
        options: [
          {
            value: 'area',
            label: 'Area'
          },
          {
            value: 'line',
            label: 'Line'
          }
        ]
      },
      category: ['Totals']
    })
    .addRadio({
      path: 'totalBreakdown',
      name: 'Breakdown',
      defaultValue: 'none',
      settings: {
        options: [
          {
            value: 'none',
            label: 'None'
          },
          {
            value: 'group',
            label: 'Group'
          },
          {
            value: 'chart',
            label: 'Chart'
          },
          {
            value: 'series',
            label: 'Series'
          }
        ]
      },
      category: ['Totals']
    })
    .addRadio({
      path: 'totalStackMode',
      name: 'Stack Mode',
      defaultValue: 'stacked',
      settings: {
        options: [
          {
            value: 'stacked',
            label: 'Stacked'
          },
          {
            value: 'stacked100',
            label: 'Stacked 100%'
          }
        ]
      },
      category: ['Totals']
    })
    .addSliderInput({
      path: 'totalPerc',
      name: 'Total Height Percent',
      defaultValue: 50,
      settings: {
        min: 0,
        max: 100,
        step: 1
      },
      category: ['Totals']
    })
    .addBooleanSwitch({
      path: 'showTotal',
      name: 'Show Total',
      category: ['Totals']
    })
    .addBooleanSwitch({
      path: 'showRangeSelector',
      name: 'Show Range Selector',
      defaultValue: false,
      category: ['Presentation']
    })
    .addBooleanSwitch({
      path: 'showGroups',
      name: 'Show Groups',
      defaultValue: false,
      category: ['Presentation']
    })
    .addSliderInput({
      path: 'leftMargin',
      name: 'Left Margin Size',
      defaultValue: 100,
      settings: {
        min: 0,
        max: 300,
        step: 1
      },
      category: ['Presentation']
    })
    .addSliderInput({
      path: 'topMargin',
      name: 'Top Margin Size',
      defaultValue: 0,
      settings: {
        min: 0,
        max: 300,
        step: 1
      },
      category: ['Presentation']
    })
    .addColorPicker({
      path: 'color',
      name: 'Chart Color',
      defaultValue: '#663399',
      category: ['Style']
    })
    .addRadio({
      path: 'colorMode',
      name: 'Color Mode',
      defaultValue: 'regular',
      settings: {
        options: [
          {
            value: 'regular',
            label: 'Regular'
          },
          {
            value: 'group',
            label: 'Group'
          },
          {
            value: 'values',
            label: 'Values'
          },
          {
            value: 'valuesInverted',
            label: 'Values (Inverted)'
          }
        ]
      },
      category: ['Style']
    })
    .addRadio({
      path: 'colorType',
      name: 'Color Type',
      defaultValue: 'single',
      settings: {
        options: [
          {
            value: 'single',
            label: 'Single'
          },
          {
            value: 'sequential',
            label: 'Sequential'
          },
          {
            value: 'alternating',
            label: 'Alternating'
          }
        ]
      },
      category: ['Style']
    })
    .addColorPicker({
      path: 'outlineColor',
      name: 'Outline Color',
      defaultValue: '#000000',
      category: ['Style']
    })
    .addSliderInput({
      path: 'outlineWidth',
      name: 'Outline Width',
      defaultValue: 2,
      settings: {
        min: 0,
        max: 10,
        step: 0.1
      },
      category: ['Style']
    })
    .addSliderInput({
      path: 'outlineOpacity',
      name: 'Outline Opacity',
      defaultValue: 0.2,
      settings: {
        min: 0,
        max: 1,
        step: 0.01
      },
      category: ['Style']
    })
    .addBooleanSwitch({
      path: 'glow',
      name: 'Glow',
      defaultValue: false,
      category: ['Style']
    })
    .addSliderInput({
      path: 'glowSpread',
      name: 'Glow Spread',
      defaultValue: 1,
      settings: {
        min: 0,
        max: 100,
        step: 1
      },
      category: ['Style']
    })
    .addBooleanSwitch({
      path: 'chartBevel',
      name: 'Bevel',
      category: ['Style']
    })
    .addBooleanSwitch({
      path: 'showBackground',
      name: 'Show Background',
      defaultValue: false,
      category: ['Style']
    })
    .addColorPicker({
      path: 'backgroundColor',
      name: 'Background Color',
      defaultValue: '#000000',
      category: ['Style']
    })

    .addBooleanSwitch({
      path: 'showChartLabels',
      name: 'Show Chart Labels',
      defaultValue: true,
      category: ['Labels']
    })
    .addColorPicker({
      path: 'labelColor',
      name: 'Label Color',
      defaultValue: '#ffffff',
      category: ['Labels']
    })
    .addSliderInput({
      path: 'chartLabelSize',
      name: 'Chart Label Size',
      defaultValue: 50,
      settings: {
        min: 5,
        max: 100,
        step: 1
      },
      category: ['Labels']
    })
    .addSliderInput({
      path: 'chartLabelShiftX',
      name: 'Chart Label Shift',
      defaultValue: 50,
      settings: {
        min: 0,
        max: 500,
        step: 1
      },
      category: ['Labels']
    })

    .addSliderInput({
      path: 'groupLabelSize',
      name: 'Group Label Size',
      defaultValue: 50,
      settings: {
        min: 5,
        max: 100,
        step: 1
      },
      category: ['Labels']
    })

    .addRadio({
      path: 'markersMode',
      name: 'Mode',
      defaultValue: 'disable',
      settings: {
        options: [
          {
            value: 'disable',
            label: 'Disable'
          },
          {
            value: 'hidden',
            label: 'Hidden'
          },
          {
            value: 'visible',
            label: 'Visible'
          }
        ]
      },
      category: ['Markers']
    })
    .addSliderInput({
      path: 'markersRadius',
      name: 'Size',
      defaultValue: 10,
      settings: {
        min: 0,
        max: 30,
        step: 0.1
      },
      category: ['Markers']
    })
    .addColorPicker({
      path: 'markersColor',
      name: 'Color',
      defaultValue: '#663399',
      category: ['Markers']
    })

    .addBooleanSwitch({
      path: 'showFog',
      name: 'Show Fog',
      defaultValue: false,
      category: ['Fog']
    })
    .addSliderInput({
      path: 'fogHeight',
      name: 'Fog Height',
      defaultValue: 50,
      settings: {
        min: 0,
        max: 100,
        step: 1
      },
      category: ['Fog']
    })
    .addColorPicker({
      path: 'fogColor',
      name: 'Fog Color',
      defaultValue: 'rgba(255, 255, 255, 0.66)',
      category: ['Fog']
    })

    .addRadio({
      path: 'transitionType',
      name: 'Type',
      defaultValue: 'none',
      settings: {
        options: [
          {
            value: 'none',
            label: 'None'
          },
          {
            value: 'groups',
            label: 'Cycle Groups'
          },
          {
            value: 'charts',
            label: 'Cycle Charts'
          }
        ]
      },
      category: ['Transitions']
    })
    .addTextInput({
      path: 'transitionPeriod',
      name: 'Period',
      defaultValue: '5000',
      category: ['Transitions']
    })

    .addBooleanSwitch({
      path: 'gridlineEnabled',
      name: 'Show',
      category: ['Gridlines'],
      defaultValue: false
    })
    .addSliderInput({
      path: 'gridlineWidth',
      name: 'Width',
      defaultValue: 3,
      settings: {
        min: 0,
        max: 20,
        step: 0.1
      },
      category: ['Gridlines']
    })
    .addSliderInput({
      path: 'gridlineTicks',
      name: 'Ticks',
      defaultValue: 30,
      settings: {
        min: 0,
        max: 100,
        step: 1
      },
      category: ['Gridlines']
    })
    .addColorPicker({
      path: 'gridlineColor',
      name: 'Color',
      defaultValue: '#0488d0',
      category: ['Gridlines']
    })
    .addRadio({
      path: 'gridlinePosition',
      name: 'Position',
      defaultValue: 'below',
      settings: {
        options: [
          {
            value: 'below',
            label: 'Below Charts'
          },
          {
            value: 'above',
            label: 'Above Charts'
          }
        ]
      },
      category: ['Gridlines']
    });
});
