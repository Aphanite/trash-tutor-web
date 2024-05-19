import { WasteCategory } from '../helpers/types'

export default [
  {
    categoryName: 'glass',
    binColor: 'green',
    description: 'Glass bottles, jars, and other glass containers.',
    domestic: false,
  },
  {
    categoryName: 'recycling',
    binColor: 'yellow',
    description:
      'All recyclables, from paper and cardboard to metal (tins, cans, spray cans, aluminium, metal lids) and plastic bottles, containers, and packaging.',
    domestic: true,
  },
  {
    categoryName: 'organic',
    binColor: 'brown',
    description: 'Food waste, garden waste, and other biodegradable items.',
    domestic: true,
  },
  {
    categoryName: 'household',
    binColor: 'grey',
    description: 'General household waste that cannot be recycled.',
    domestic: true,
  },
  {
    categoryName: 'electronic',
    binColor: 'black',
    description: 'Electronic waste such as old phones, computers, and other electronic devices.',
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
