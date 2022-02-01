export type SelectionHighlightMode = 'none' | 'focus' | 'exclusive'

export class Selection {
    key: string;
    value: string;
    type: SelectionType = SelectionType.None
    active: boolean = false;
    x: number = -1
    y: number = -1
    hightlightMode: SelectionHighlightMode = 'none'
    currentColor: string | undefined
  
    constructor(key: string, value: string) {
      this.key = key
      this.value = value === undefined ? "" : value
      this.active = true
    }
  
    deselect() {
      this.active = false
      this.type = SelectionType.None
      this.hightlightMode = 'none'
      this.currentColor = undefined
    }
  
    updatePositionForGroup(groupName: string, x: number, y: number) {
      if (this.active && this.type === SelectionType.Group && this.value == groupName) {
        this.x = x
        this.y = y
      }
    }
    updatePositionForChart(chartName: string, x: number, y: number) {
      if (this.active && this.type === SelectionType.Chart && this.value == chartName) {
        this.x = x
        this.y = y
      }
    }
  }

  export enum SelectionType {
    None = 1,
    Chart,
    Group
  }
  