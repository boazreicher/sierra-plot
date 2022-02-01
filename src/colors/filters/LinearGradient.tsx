import { Color } from 'colors/Color';
import { Filter } from './Filter';
import React from 'react';

export class LinearGradient extends Filter {
  colors: Color[];

  constructor(name: string, colors: Color[]) {
    super(name);
    this.colors = colors;
  }

  toFilter() {
    if (this.colors.length < 2) {
      return <></>;
    }

    let step = 100 / (this.colors.length - 1);
    let offset = 0;
    return (
      <linearGradient key={this.filterName} id={this.filterName} x1="0%" y1="0%" x2="0%" y2="100%">
        {this.colors.map((color) => {
          return (
            <stop key={this.filterName + "_stop"} offset={offset * step + '%'} stopColor={this.colors[offset++].toString()} stopOpacity="1"></stop>
          );
        })}
      </linearGradient>
    );
  }
}
