import { Filter } from 'colors/filters/Filter';
import React from 'react';

export const SierraPlotDefs = ({ ...props }: React.SVGProps<SVGElement> & { filters: Set<Filter> }) =>
  generateDefs(props.filters);

function generateDefs(filters: Set<Filter>) {
  return <defs>{Array.from(filters.values()).map((filter) => filter.toFilter())}</defs>;
}
