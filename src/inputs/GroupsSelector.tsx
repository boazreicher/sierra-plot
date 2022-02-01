import { Labels, SelectableValue, StandardEditorProps } from '@grafana/data';
import { MultiSelect } from '@grafana/ui';
import React from 'react';
import { groupField } from 'SierraPlotPanel';

export const GroupsSelector: React.FC<StandardEditorProps<string[]>> = ({ item, value, onChange, context }) => {
  const options: SelectableValue<string>[] = [];

  options.push({ label: 'All', value: '*' });
  options.push({ label: 'None', value: '' });

  if (context.data) {
    const frames = context.data;

    let values: Set<string> = new Set();
    for (let i = 0; i < frames.length; i++) {
      for (let fieldIndex = 0; fieldIndex < frames[i].fields.length; fieldIndex++) {
        for (let label in frames[i].fields[fieldIndex].labels) {
          if (groupField === undefined || groupField !== label) {
            continue;
          }
          let foo: Labels | undefined = frames[i].fields[fieldIndex].labels;
          let bar: Labels;
          if (foo === undefined) {
            bar = {};
          } else {
            bar = foo;
          }

          values.add(bar[groupField]);
        }
      }
    }

    for (let value of values) {
      options.push({
        label: value,
        value: value,
      });
    }
  }
  return (
    <MultiSelect
      isClearable
      isLoading={false}
      value={value as string[]}
      onChange={(e) => onChange(e.map((_) => _.value!))}
      options={options}
    />
  );
};
