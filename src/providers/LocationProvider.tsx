import React from 'react'

const LocationContext = React.createContext<string | null | undefined>(undefined)

export function LocationProvider({ children }: React.PropsWithChildren) {
  console.log('in LocationProvider')
  const [location, setLocation] = React.useState<string | null>(
    window.localStorage.getItem('location'),
  )

  async function reverseGeocode(latitude: number, longitude: number) {
    try {
      const url = `https://trashtutor.worker.aphanite.net/reverse_geocode?lat=${latitude}&lon=${longitude}`

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      console.log('json', json)

      return json
    } catch (error) {
      return { status: 'error', message: 'Connection to Worker failed' }
    }
  }

  async function fetchLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coords } = position

          reverseGeocode(coords.latitude, coords.longitude)
            .then(response => resolve(response))
            .catch(err => reject(err))
        },
        _error => {
          reject({ status: 'error', message: 'Retrieving current position failed' })
        },
        { timeout: 20000, maximumAge: 1000 },
      )
    })
  }

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>
}

export function useLocation() {
  const location = React.useContext(LocationContext)
  if (location === undefined) {
    throw new Error('uselocation must be used within a LocationProvider')
  }
  return location
}
