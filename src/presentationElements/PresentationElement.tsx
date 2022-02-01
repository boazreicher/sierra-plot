import { SvgElement } from "svg/SvgElement";


export interface PresentationElement {
    toSvgElements(elements: SvgElement[]): SvgElement[]
}