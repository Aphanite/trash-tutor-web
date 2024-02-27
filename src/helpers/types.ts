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
  userDescription?: string // when description displayed to user should be different from description for AI
}
