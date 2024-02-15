import React from 'react'

export type PageKey =
  | 'landingPage'
  | 'cameraPermission'
  | 'camera'
  | 'apiKeyForm'
  | 'imagePreview'
  | 'success'
  | 'error'

export type Page = {
  type: PageKey
  props: Object
}

type PageValue = { currentPage: Page; navigate: (arg0: PageKey, arg1?: any) => void }

const PageContext = React.createContext<PageValue | undefined>(undefined)

export function PageProvider({ children }: React.PropsWithChildren) {
  const [currentPage, setCurrentPage] = React.useState<Page>({ type: 'camera', props: {} })
  console.log('currentPage in Provider', currentPage)

  function navigate(page: PageKey, props: any = {}) {
    setCurrentPage({ type: page, props })
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
