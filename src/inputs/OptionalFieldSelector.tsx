import { SelectableValue, StandardEditorProps } from '@grafana/data';
import { Select } from '@grafana/ui';
import React from 'react';

export const OptionalFieldSelector: React.FC<StandardEditorProps<string>> = ({ item, value, onChange, context }) => {
  const options: Array<SelectableValue<string>> = [];
  options.push({ label: 'None', value: undefined });

  var values: Set<string> = new Set();

  if (context.data) {
    const frames = context.data;
    for (let i = 0; i < frames.length; i++) {
      let dataFrame = frames[i];
      dataFrame.fields.forEach((field) => {
        if (field.type === 'number') {
          values.add(field.name);
        }
      });
    }

    for (let value of values) {
      options.push({
        label: value,
        value: value,
      });
    }
  }

  return <Select options={options} value={value} onChange={(selectableValue) => onChange(selectableValue.value)} />;
};
