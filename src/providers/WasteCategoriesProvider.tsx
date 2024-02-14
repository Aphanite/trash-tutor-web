import React from 'react'
import useHasMounted from '../hooks/useHasMounted'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WasteColorKeys } from '../themes/theme'
import { germanWasteCategories } from '../helpers/wasteHelpers'

export type WasteCategory = {
  categoryName: string
  binColor: WasteColorKeys
  description: string
}
type LocationWasteMap = { [locationName: string]: WasteCategory[] }

type WasteCache = LocationWasteMap | null

type WasteContextValue = {
  getCategoriesForLocation: (arg0: string | null) => WasteCategory[] | undefined
  saveCategoriesForLocation: (arg0: LocationWasteMap) => void
}

const WasteCategoriesContext = React.createContext<WasteContextValue | undefined>(undefined)

export function WasteCategoriesProvider({ children }: React.PropsWithChildren) {
  console.log('Rendering Waste Context')
  const hasMounted = useHasMounted()
  const [wasteCategories, setWasteCategories] = React.useState<WasteCache>(null)
  console.log('wasteCategories', wasteCategories)

  function getCategoriesForLocation(location: string | null) {
    if (location === null) return undefined
    return location.includes('Germany') ? germanWasteCategories : wasteCategories?.[location]
  }

  function saveCategoriesForLocation(categoryMap: LocationWasteMap) {
    setWasteCategories((current: WasteCache) => {
      return current ? { ...current, ...categoryMap } : categoryMap
    })
  }

  async function getWasteStorage(): Promise<WasteCache> {
    const wasteCache = await AsyncStorage.getItem('wasteCategories')
    return wasteCache && JSON.parse(wasteCache)
  }

  async function updateWasteStorage(categories: WasteCache) {
    categories && AsyncStorage.setItem('wasteCategories', JSON.stringify(categories))
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
