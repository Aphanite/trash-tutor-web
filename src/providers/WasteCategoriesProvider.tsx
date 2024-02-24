import React from 'react'
import useHasMounted from '../hooks/useHasMounted'
import { WasteCategory } from '../helpers/types'
import { storedWasteCategories } from '../data/cats'

type LocationWasteMap = { [locationName: string]: WasteCategory[] }

type WasteCache = LocationWasteMap | null

type WasteContextValue = {
  getCategories: (arg0: string | null) => WasteCategory[] | undefined
  saveCategories: (arg0: LocationWasteMap) => void
}

const WasteCategoriesContext = React.createContext<WasteContextValue | undefined>(undefined)

export function WasteCategoriesProvider({ children }: React.PropsWithChildren) {
  const hasMounted = useHasMounted()

  const [categories, setCategories] = React.useState<WasteCache>(null)

  function getCategories(location: string | null) {
    if (location === null) return storedWasteCategories.de
    return location.includes('Germany') ? storedWasteCategories.de : categories?.[location]
  }

  function saveCategories(catMap: LocationWasteMap) {
    setCategories((current: WasteCache) => {
      return current ? { ...current, ...catMap } : catMap
    })
  }

  function getWasteStorage(): Promise<WasteCache> {
    const wasteCache = window.localStorage.getItem('wasteCategories')
    return wasteCache && JSON.parse(wasteCache)
  }

  function updateWasteStorage(cats: WasteCache) {
    cats && window.localStorage.setItem('wasteCategories', JSON.stringify(cats))
  }

  React.useEffect(() => {
    async function handleStorage() {
      if (hasMounted) {
        await updateWasteStorage(categories)
      } else {
        // fetch categories from cache on mount
        const cachedCategories = await getWasteStorage()
        cachedCategories && setCategories(cachedCategories)
      }
    }
    handleStorage()
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
