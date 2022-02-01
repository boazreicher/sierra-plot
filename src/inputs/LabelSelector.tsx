import { SelectableValue, StandardEditorProps } from "@grafana/data";
import { Select } from "@grafana/ui";
import React from "react";

export const LabelSelector: React.FC<StandardEditorProps<string>> = ({ item, value, onChange, context }) => {
    const options: SelectableValue<string>[] = [];

    options.push({ label: "None", value: undefined })

    if (context.data) {
        const frames = context.data;

        var labels: Set<string> = new Set()
        for (let i = 0; i < frames.length; i++) {
            for (let fieldIndex = 0; fieldIndex < frames[i].fields.length; fieldIndex++) {
                for (let label in frames[i].fields[fieldIndex].labels) {
                    labels.add(label)
                }
            }
        }

        for (let label of labels) {
            options.push({
                label: label,
                value: label,
            });
        }
    }

    return <Select options={options} value={value} onChange={(selectableValue) => onChange(selectableValue.value)} />;
};