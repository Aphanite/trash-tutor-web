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

export type ErrorCodes =
  | 'unidentifiable_object'
  | 'unidentifiable_category'
  | 'multiple_objects'
  | 'no_tool_call'
  | 'internal_server_error'
  | 'connection_error'
  | 'response_not_json'
  | 'invalid_api_key'
