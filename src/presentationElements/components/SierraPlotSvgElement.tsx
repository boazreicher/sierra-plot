
import * as React from "react";
import { SvgElement } from "svg/SvgElement";


export const SierraPlotSvgElement = ({
  ...props
}: React.SVGProps<SVGElement> & { element: SvgElement } & { height: number | undefined }) => (
  props.element.buildElement(props.height)
);
