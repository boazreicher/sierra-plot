import { Filter } from './Filter';
import React from 'react';

export class Glow extends Filter {
  glowSpread: number;

  constructor(name: string, glowSpread: number) {
    super(name);
    this.glowSpread = glowSpread;
  }

  toFilter() {
    return (
      <filter id={this.filterName} filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={5 + ((this.glowSpread - 5) / 4) * 1} result="blur2" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={5 + ((this.glowSpread - 5) / 4) * 2} result="blur3" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={5 + ((this.glowSpread - 5) / 4) * 3} result="blur4" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={this.glowSpread} result="blur5" />

        <feMerge result="blur-merged">
          {this.glowSpread >= 10 ? <feMergeNode in="blur2" /> : ''}
          {this.glowSpread >= 20 ? <feMergeNode in="blur3" /> : ''}
          {this.glowSpread >= 30 ? <feMergeNode in="blur4" /> : ''}
          {this.glowSpread >= 50 ? <feMergeNode in="blur5" /> : ''}
        </feMerge>

        <feColorMatrix
          result="red-blur"
          in="blur-merged"
          type="matrix"
          values="1 0 0 0 0
                         0 0.06 0 0 0
                         0 0 0.44 0 0
                         0 0 0 1 0"
        />
        <feMerge>
          <feMergeNode in="red-blur" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    );
  }
}
