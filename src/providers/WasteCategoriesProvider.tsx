import React from 'react'
import useHasMounted from '../hooks/useHasMounted'
import { WasteCategory } from '../helpers/types'

type LocationWasteMap = { [locationName: string]: WasteCategory[] }

type WasteCache = LocationWasteMap | null

type WasteContextValue = {
  getCategoriesForLocation: (arg0: string | null) => WasteCategory[] | undefined
  saveCategoriesForLocation: (arg0: LocationWasteMap) => void
}

const WasteCategoriesContext = React.createContext<WasteContextValue | undefined>(undefined)

export function WasteCategoriesProvider({ children }: React.PropsWithChildren) {
  const hasMounted = useHasMounted()
  const [wasteCategories, setWasteCategories] = React.useState<WasteCache>(null)

  function getCategoriesForLocation(location: string | null) {
    if (location === null) return germanWasteCategories
    return location.includes('Germany') ? germanWasteCategories : wasteCategories?.[location]
  }

  function saveCategoriesForLocation(categoryMap: LocationWasteMap) {
    setWasteCategories((current: WasteCache) => {
      return current ? { ...current, ...categoryMap } : categoryMap
    })
  }

  function getWasteStorage(): Promise<WasteCache> {
    const wasteCache = window.localStorage.getItem('wasteCategories')
    return wasteCache && JSON.parse(wasteCache)
  }

  function updateWasteStorage(categories: WasteCache) {
    categories && window.localStorage.setItem('wasteCategories', JSON.stringify(categories))
  }

  React.useEffect(() => {
    async function handleStorage() {
      if (hasMounted) {
        await updateWasteStorage(wasteCategories)
      } else {
        // fetch categories from cache on mount
        const cachedCategories = await getWasteStorage()
        cachedCategories && setWasteCategories(cachedCategories)
      }
    }
    handleStorage()
  }, [wasteCategories])

  return (
    <WasteCategoriesContext.Provider
      value={{ getCategoriesForLocation, saveCategoriesForLocation }}
    >
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
