import { WasteCategory } from '../helpers/types'

export default [
  {
    categoryName: 'household',
    binColor: 'black',
    description: 'Non-recyclable waste such as nappies, polystyrene, and plastic film',
    domestic: true,
  },
  {
    categoryName: 'recycling',
    binColor: 'green',
    description: 'Paper, cardboard, plastic bottles, cans, and glass bottles/jars',
    domestic: true,
  },
  {
    categoryName: 'food',
    binColor: 'brown',
    description:
      'All food waste including fruit, vegetables, meat, fish, dairy, bread, and leftovers',
    domestic: true,
  },
  {
    categoryName: 'glass',
    binColor: 'green',
    description: 'Paper, cardboard, plastic bottles, cans, and glass bottles/jars',
    domestic: true,
  },
  {
    categoryName: 'garden',
    binColor: 'brown',
    description: 'Grass cuttings, leaves, flowers, plants, weeds, and small branches',
    domestic: false,
  },
  {
    categoryName: 'textiles',
    binColor: 'purple',
    description: 'Clothes, shoes, and textiles. Must be clean and dry',
    domestic: false,
  },
  {
    categoryName: 'hazardous',
    binColor: 'red',
    description: 'Batteries, electronics, chemicals, paint, and light bulbs',
    domestic: false,
  },
  {
    categoryName: 'bulky',
    binColor: 'grey',
    description: 'Large items like furniture, appliances, and renovation debris',
    domestic: false,
  },
] as WasteCategory[]
