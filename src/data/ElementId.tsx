import {
  ID_KV_SEPERATOR,
  ID_SEPERATOR,
  ID_TYPE_CHART_ELEMENT,
  ID_TYPE_GROUP_ELEMENT,
  ID_TYPE_LABEL_ELEMENT,
  ID_TYPE_SERIES_ELEMENT,
  TOTAL_ELEMENT_ID,
} from 'Constants';

export class ElementId {
  type: string;
  group: string | undefined;
  chart: string | undefined;
  series: string | undefined;
  value: string | undefined;

  constructor(id: string) {
    let elements = id.split(ID_SEPERATOR);
    this.type = elements[0];

    if (elements.length === 2 && elements[1] === TOTAL_ELEMENT_ID) {
      this.value = TOTAL_ELEMENT_ID;
      return;
    }
    if (elements.length === 2 && elements[1] === ID_TYPE_LABEL_ELEMENT) {
      this.value = TOTAL_ELEMENT_ID;
      return;
    }

    for (let index = 1; index < elements.length; index++) {
      let pair = elements[index].split(ID_KV_SEPERATOR);
      let elementType = pair[0];
      let value = pair[1];

      switch (elementType) {
        case ID_TYPE_SERIES_ELEMENT:
          this.series = value;
          break;
        case ID_TYPE_CHART_ELEMENT:
          this.chart = value;
          break;
        case ID_TYPE_GROUP_ELEMENT:
          this.group = value;
          break;
        default:
          throw new Error('Invalid element id ' + id + ' with type ' + elementType);
      }
    }
  }
}
