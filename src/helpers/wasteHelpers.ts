import { WasteCategory } from '../providers/WasteCategoriesProvider'

export const germanWasteCategories: WasteCategory[] = [
  {
    categoryName: 'packaging',
    binColor: 'yellow',
    description:
      'Plastic/metal objects or composites, e.g. foam materials, tools, screws, and toys',
  },
  {
    categoryName: 'paper',
    binColor: 'blue',
    description: 'Paper and cardboard, excluding e.g. greasy pizza boxes',
  },
  {
    categoryName: 'organic',
    binColor: 'brown',
    description: 'All organic waste, including fruit, vegetable, meat, and bread waste',
  },
  {
    categoryName: 'glass',
    binColor: 'green',
    description:
      'Glass packaging for food, beverages, medicals, and cosmetics but excluding window and mirror glass',
  },
  {
    categoryName: 'residual',
    binColor: 'black',
    description:
      'Unusable or non-recyclable items such as diapers, cigarettes, and vacuum cleaner bags',
  },
  {
    categoryName: 'special',
    binColor: 'grey',
    description:
      'Including but not limited to batteries, electrical devices, textiles and furniture',
  },
]
