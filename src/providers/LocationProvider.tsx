import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'

const LocationContext = React.createContext<string | null | undefined>(undefined)

export function LocationProvider({ children }: React.PropsWithChildren) {
  const [location, setLocation] = React.useState<string | null>(null)

  async function fetchLocation() {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      const url = `https://trashtutor.worker.aphanite.net/reverse_geocode?lat=${coords.latitude}&lon=${coords.longitude}`

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      console.log('json', json)

      return json
    } catch (error) {
      console.error('Request to Worker failed: ', error)
      return { status: 'error', message: 'Connection to Worker failed' }
    }
  }

  React.useEffect(() => {
    async function requestLocation() {
      const savedLocation = await AsyncStorage.getItem('location')

      if (savedLocation === null) {
        const permission = await Location.requestForegroundPermissionsAsync()

        if (permission.status === 'granted') {
          const { status, data } = await fetchLocation()
          if (status === 'success') {
            setLocation(data)
            await AsyncStorage.setItem('location', data)
          }
        }
      } else {
        setLocation(savedLocation)
      }
    }

    requestLocation()
  }, [])

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>
}

export function useLocation() {
  const location = React.useContext(LocationContext)
  if (location === undefined) {
    throw new Error('uselocation must be used within a LocationProvider')
  }
  return location
}
