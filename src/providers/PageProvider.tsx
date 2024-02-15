import React from 'react'

type PageKey =
  | 'landingPage'
  | 'cameraPermission'
  | 'camera'
  | 'apiKeyForm'
  | 'imagePreview'
  | 'success'
  | 'error'

type PageValue = { currentPage: PageKey; navigate: (arg0: PageKey) => void }

const PageContext = React.createContext<PageValue | undefined>(undefined)

export function PageProvider({ children }: React.PropsWithChildren) {
  const [currentPage, setCurrentPage] = React.useState<PageKey>('landingPage')
  console.log('currentPage in Provider', currentPage)
  function navigate(page: PageKey) {
    setCurrentPage(page)
  }

  return <PageContext.Provider value={{ currentPage, navigate }}>{children}</PageContext.Provider>
}
export function usePage() {
  const page = React.useContext(PageContext)
  if (page === undefined) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return page
}
