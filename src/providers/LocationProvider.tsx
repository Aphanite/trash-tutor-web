import React from 'react'

export type LocationObject = { city: string; country: string; countryCode: string }
type GeocodeResult =
  | {
      status: 'success'
      data: LocationObject
    }
  | { status: 'error'; message: string }

const LocationContext = React.createContext<
  { location: LocationObject | null; fetchLocation: () => void } | undefined
>(undefined)

export function LocationProvider({ children }: React.PropsWithChildren) {
  const [location, setLocation] = React.useState<LocationObject | null>(() => {
    const locationString = window.localStorage.getItem('location')
    return locationString ? JSON.parse(locationString) : null
  })

  async function reverseGeocode(latitude: number, longitude: number): Promise<GeocodeResult> {
    const url = `https://worker.trashtutor.com/reverse_geocode?lat=${latitude}&lon=${longitude}`

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json()

    return json
  }

  async function fetchLocation() {
    try {
      const result: GeocodeResult = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { coords } = position

            reverseGeocode(coords.latitude, coords.longitude)
              .then(response => resolve(response))
              .catch(_err => reject({ status: 'error', message: 'Connection to Worker failed' }))
          },
          _error => {
            reject({ status: 'error', message: 'Retrieving current position failed' })
          },
          { timeout: 20000, maximumAge: 1000 },
        )
      })
      console.log('result', result)

      if (result?.status === 'success') {
        setLocation(result.data)
        window.localStorage.setItem('location', JSON.stringify(result.data))
      }
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <LocationContext.Provider value={{ location, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const location = React.useContext(LocationContext)
  if (location === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return location
}
