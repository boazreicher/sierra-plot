# Configuration Options

## Fields

| Name | Description | Required | Example |
| ------------ | ------------- | ------------ | ------------ |
| `Amplitude` | Value field that determines the amplitude (height) of each chart | **Required** | Request Count, Error Count |
| `Breakdown` | String field (dimension) on which to split the data into different charts | **Required** | Host Name |
|`Group` | String field (dimension) used to group different charts based on common values | *Optional* | Cluster Name |


## Fields [Advanced]

| Name | Description | Required | Example |
| ------------ | ------------- | ------------ | ------------ |
| `Weight` | Value field that determines the weight of each chart.  Used for calculating weighted averages | *Optional* | Total Request Count |
| `Series Breakdown` | String field (dimension) on which to split each chart to multiple (usually stacked) series | *Optional* | Request Type |
|`Series Values` | Specific series values to include in the results | *Optional* | GET, POST, PUT |
| `Series Values to Exclude` | Specific series values to exclude from the results | *Optional* | GET, POST, PUT |
| `Group Values` | Specific group values to include in the results | *Optional* | Cluster1, Cluster2 |
|`Group Values to Exclude` | Specific group values to exclude from the results | *Optional* | Cluster1, Cluster2 |

## Series
*The following options contorl the behaviour and appearance of the specific charts*

| Name | Description |
| ------------ | ------------- |
| `Sort Mode` | Mode for sorting groups and then charts within groups |
| `Chart Type` | Chart type for regular charts.  Either linechart or stacked area chart |
| `Stepped Area Chart` | Determines if lines between adjacent data points should be simply connected or appear as steps |
| `Aggregation` | Determines how series values within a chart should be aggregated |
| `Max Y Type` | Determines the how the Y-axis is scaled for each chart: <ul><li>`Global`: Scaling relative to the maximum value across all charts</li><li>`Total`: Scaling relative to the total maximum value</li><li>`Local`: Scaling relative to the maximum value in each chart</li><li>`Group`: Scaling relative to the maximum value across all charts in each group</li></ul>|
| `Skew Percent` | Positions each chart with an increasing horizontal offset |
| `Scale Y` | Controls the vertical size of each chart |


## Totals
*The following options contorl the behaviour and appearance of the totals chart*

| Name | Description |
| ------------ | ------------- |
| `Chart Type` | Chart type for the totals chart.  Either linechart or stacked area chart |
| `Breakdown` | Breakdown composition for the totals chart: <ul><li>`None`: A single series.  Aggregation of **all** values</li><li>`Group`: Aggregate by groups</li><li>`Chart`: Aggregate by chart</li><li>`Series`: Aggregate by series (only if series breakdown is used)</li></ul>||
| `Stack Mode` | Stack by actual values, or stack to 100% |
| `Total Height Percent` | Percentage of the plot area for the totals chart to occupy |
| `Show Total` | Show or hide the totals chart |

## Presentation

| Name | Description |
| ------------ | ------------- |
| `Show Range Selector` | Show or hide the X-axis' time range selector |
| `Show Groups` | Show or hide the group indicators and labels (doesn't affect any other behavior)|
| `Left Margin Size` | Size of the margin between the charts' left-most position and the panel's left border |
| `Top Margin Size` | Size of the margin between the charts' upper-most position and the panel's top border (or the total's chart, if it is visible)|

## Style

| Name | Description |
| ------------ | ------------- |
| `Chart Color` | Base color for charts |
| `Color Mode` | <ul><li>`Regular`: Chart color is determined by `Chart Color` and `Color Type`</li><li>`Group`: The chart color's hue is determined by the group's color and `Color Type`.  `Chart Color` determines only the saturation and lightness</li><li>`Values`: Gradient color based only on the chart's values</li><li>`Values (inverted)`: Same as `Values`, but with inverted colors</li></ul> |
| `Color Type` |<ul><li>`Single`: Use a single color for every chart (or every chart in a group, if `Color Mode` is set to `Group`)</li><li>`Sequential`: Use increasing lightness values for each chart in a sequence (if  `Color Mode` is set to `Group`, the sequence is reset for each group)</li><li>`Alternating`: Alternate lightness values for each chart in a sequence</li></ul> |
| `Outline Color` | Color for each chart's outline (or for the chart itself, if `Chart Type` is set to `Line`) |
| `Outline Width` | Width for each chart's outline (or for the chart itself, if `Chart Type` is set to `Line`)|
| `Outline Opacity` | Opacity for each chart's outline (or for the chart itself, if `Chart Type` is set to `Line`) |
| `Glow` | If enabled, each outline has a glow effect (based on `Outline Color`) |
| `Glow Spread` | Size of the glow effect |
| `Bevel` | If enabled, each chart has a bevel effect (only applicable to area charts) |
| `Show Background` | If enabled, displays a background element behind the charts|
| `Background Color` | Color for the background element |

## Labels

| Name | Description |
| ------------ | ------------- |
| `Show Chart Labels` | Show or hide chart labels |
| `Label Color` | Color for chart and group labels |
| `Chart Label Size` | Size of chart labels |
| `Chart Label Shift` | Shift chart labels horizontally (away from the charts) |
| `Group Label Size` | Size of group labels |

## Markers
*Markers are indicators (when hovering over) of the timestamp and value of each series data point*

!!! warning inline

    Enabling markers in plots that have a very high number of data points might have performance implications

| Name | Description |
| ------------ | ------------- |
| `Mode` | <ul><li>`Disable`: Markers aren't drawn</li><li>`Hidden`: Markers are present (tooltip on mouse over) but are hidden</li><li>`Visible`: Markers are visible as dots on each series data point</li></ul> |
| `Show Chart Labels` | Show or hide chart labels |
| `Show Chart Labels` | Show or hide chart labels |

## Fog

| Name | Description |
| ------------ | ------------- |
| `Show Fog` | Show or hide fog |
| `Fog Height` | Fog height, as a percentage of each chart's height |
| `Fog Color` | Color for fog (supports transparency) |

## Transitions

| Name | Description |
| ------------ | ------------- |
| `Type` | <ul><li>`None`: Disable transitions</li><li>`Cycle Groups`: Highlight a new group every `Period` milliseconds</li><li>`Cycle Charts`: Highlight a new chart every `Period` milliseconds</li></ul> |
| `Period` | Cycle duration in milliseconds |

## Gridlines

| Name | Description |
| ------------ | ------------- |
| `Show` | Show or hide vertical gridlines |
| `Width` | Width of the vertical gridlines |
| `Ticks` | Number of vertical gridlines |
| `Color` | Color for vertical gridlines|
| `Position` | <ul><li>`Below Charts`: Position gridlines under the charts</li><li>`Aboce Chart`: Position gridlines above the charts</li></ul> |