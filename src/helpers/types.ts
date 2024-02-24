export type WasteColors =
  | 'blue'
  | 'green'
  | 'yellow'
  | 'brown'
  | 'red'
  | 'grey'
  | 'black'
  | 'white'
  | 'purple'
  | 'null'

export type WasteCategory = {
  categoryName: string
  binColor: WasteColors
  description: string
  domestic: boolean
}
