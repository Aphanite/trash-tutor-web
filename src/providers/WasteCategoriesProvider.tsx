import React from 'react'
import useHasMounted from '../hooks/useHasMounted'
import { WasteCategory } from '../helpers/types'
import { storedWasteCategories } from '../data/cats'

type LocationWasteMap = { [locationName: string]: WasteCategory[] }

type WasteContextValue = {
  getCategories: (arg0: string | null) => WasteCategory[] | undefined
  saveCategories: (arg0: LocationWasteMap) => void
}

const WasteCategoriesContext = React.createContext<WasteContextValue | undefined>(undefined)

export function WasteCategoriesProvider({ children }: React.PropsWithChildren) {
  const hasMounted = useHasMounted()

  const [categories, setCategories] = React.useState<LocationWasteMap | null>(null)

  function getCategories(location: string | null) {
    if (location === null) return storedWasteCategories.de

    if (location.includes('Germany')) return storedWasteCategories.de
    if (location.includes('Hungary')) return storedWasteCategories.hu

    return categories?.[location]
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
