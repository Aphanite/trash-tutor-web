import React from 'react'
import useHasMounted from '../hooks/useHasMounted'
import { WasteCategory } from '../helpers/types'
import { storedWasteCategories } from '../data/cats'
import { LocationObject } from './LocationProvider'

type LocationWasteMap = { [countryCode: string]: WasteCategory[] }

type WasteContextValue = {
  getCategories: (arg0: LocationObject | null) => WasteCategory[] | undefined
  saveCategories: (arg0: LocationWasteMap) => void
}

const WasteCategoriesContext = React.createContext<WasteContextValue | undefined>(undefined)

export function WasteCategoriesProvider({ children }: React.PropsWithChildren) {
  const hasMounted = useHasMounted()

  const [categories, setCategories] = React.useState<LocationWasteMap | null>(null)

  function getCategories(location: LocationObject | null) {
    if (location === null) return storedWasteCategories.de // german categories as default when no location

    return storedWasteCategories[location.countryCode] || categories?.[location.countryCode]
  }

  function saveCategories(newCats: LocationWasteMap) {
    setCategories(current => {
      return current ? { ...current, ...newCats } : newCats
    })
  }

  React.useEffect(() => {
    if (hasMounted) {
      categories && window.localStorage.setItem('wasteCategories', JSON.stringify(categories))
    } else {
      // fetch categories from cache on mount
      const cache = window.localStorage.getItem('wasteCategories')
      cache && setCategories(JSON.parse(cache))
    }
  }, [categories])

  return (
    <WasteCategoriesContext.Provider value={{ getCategories, saveCategories }}>
      {children}
    </WasteCategoriesContext.Provider>
  )
}

export function useWasteContext() {
  const wasteContext = React.useContext(WasteCategoriesContext)
  if (wasteContext === undefined) {
    throw new Error('useWasteCategories must be used within a WasteCategoriesProvider')
  }
  return wasteContext
}
