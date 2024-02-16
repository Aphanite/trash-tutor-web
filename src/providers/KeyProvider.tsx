import React from 'react'

const KeyContext = React.createContext<
  { key: string | null; updateKey: (newKey: string) => void } | undefined
>(undefined)

export function KeyProvider({ children }: React.PropsWithChildren) {
  console.log('in KeyProvider')
  const [key, setKey] = React.useState<string | null>(() =>
    window.localStorage.getItem('openAIKey'),
  )

  function updateKey(newKey: string) {
    setKey(newKey)
    window.localStorage.setItem('openAIKey', newKey)
  }

  return <KeyContext.Provider value={{ key, updateKey }}>{children}</KeyContext.Provider>
}

export function useKey() {
  const page = React.useContext(KeyContext)
  if (page === undefined) {
    throw new Error('useKey must be used within a KeyProvider')
  }
  return page
}
