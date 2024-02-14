import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useKey() {
  const [apiKey, setApiKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function getKeyfromCache() {
      const cachedKey = await AsyncStorage.getItem('openAIKey')
      if (cachedKey) setApiKey(cachedKey)
    }
    getKeyfromCache()
  }, [])

  return apiKey
}
