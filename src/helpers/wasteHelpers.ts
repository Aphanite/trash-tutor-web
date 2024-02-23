export type WasteColorKeys =
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
export type WasteColors = Record<WasteColorKeys, string>

export type WasteCategory = {
  categoryName: string
  binColor: WasteColorKeys
  description: string
  domestic: boolean
}

export const wasteColors: WasteColors = {
  blue: '#3795CA',
  green: '#609C66',
  yellow: '#F09436',
  brown: '#944025',
  red: '#D7191C',
  grey: '#8A98A6',
  black: '#232323',
  white: '#f8faed',
  purple: '#9D26E9',
  null: '#47525C',
}

export const germanWasteCategories: WasteCategory[] = [
  {
    categoryName: 'packaging',
    binColor: 'yellow',
    description:
      'Plastic/metal objects or composites, e.g. foam materials, tools, screws, and toys',
    domestic: true,
  },
  {
    categoryName: 'paper',
    binColor: 'blue',
    description: 'Paper and cardboard, excluding e.g. greasy pizza boxes',
    domestic: true,
  },
  {
    categoryName: 'organic',
    binColor: 'brown',
    description: 'All organic waste, including fruit, vegetable, meat, and bread waste',
    domestic: true,
  },
  {
    categoryName: 'glass',
    binColor: 'green',
    description:
      'Glass packaging for food, beverages, medicals, and cosmetics but excluding window and mirror glass',
    domestic: false,
  },
  {
    categoryName: 'residual',
    binColor: 'black',
    description:
      'Unusable or non-recyclable items such as diapers, cigarettes, and vacuum cleaner bags',
    domestic: true,
  },
  {
    categoryName: 'batteries',
    binColor: 'red',
    description: 'Batteries and rechargeable batteries',
    domestic: false,
  },
  {
    categoryName: 'electronic',
    binColor: 'red',
    description:
      'Electrical or electronic devices, e.g. computers, mobile phones, TVs, washing machines, microwaves',
    domestic: false,
  },
  {
    categoryName: 'hazardous',
    binColor: 'red',
    description:
      'Waste that can harm health and the environment, e.g. medical waste, LED lamps, used oils and toner cartridges, antifreeze, aerosol bottles, and car oil filters',
    domestic: false,
  },
  {
    categoryName: 'textiles',
    binColor: 'purple',
    description: 'Clean used or unused clothing, shoes and other textiles in a usable condition',
    domestic: false,
  },
]
