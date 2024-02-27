import { WasteCategory } from '../helpers/types'

export default [
  {
    categoryName: 'packaging',
    binColor: 'yellow',
    description:
      'Plastic and metal objects like PET bottles, household foil, scrap metal (e.g. cutlery), and metal cans (drinks)',
    domestic: true,
  },
  {
    categoryName: 'paper',
    binColor: 'blue',
    description:
      'Paper and cardboard, excluding papers containing food residues and other contaminants (e.g. greasy pizza boxes)',
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
      'Glass packaging for food, beverages, medicals, and cosmetics - excluding window and mirror glass',
    domestic: false,
  },
  {
    categoryName: 'household',
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
      'Waste that can harm health and environment, e.g. medical waste, LED lamps, used oils and toner cartridges, antifreeze, aerosol bottles, and car oil filters',
    domestic: false,
  },
  {
    categoryName: 'textiles',
    binColor: 'purple',
    description: 'Clean used or unused clothing, shoes and other textiles in a usable condition',
    domestic: false,
  },
  {
    categoryName: 'bulky',
    binColor: 'grey',
    description:
      'Too large waste items such as discarded furniture, large appliances (e.g. fridges, ovens) and green waste (e.g. branches, logs)',
    domestic: false,
  },
] as WasteCategory[]
