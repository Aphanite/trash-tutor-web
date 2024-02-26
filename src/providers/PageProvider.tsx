import React from 'react'

export type PageKey =
  | 'landingPage'
  | 'location'
  | 'apiKeyForm'
  | 'guide'
  | 'camera'
  | 'imagePreview'
  | 'success'
  | 'error'

export type Page = {
  type: PageKey
  props: Object
}

type PageValue = { currentPage: Page; navigate: (page: PageKey, props?: any) => void }

const PageContext = React.createContext<PageValue | undefined>(undefined)

export function PageProvider({ children }: React.PropsWithChildren) {
  console.log('in PageProvider')
  const [currentPage, setCurrentPage] = React.useState<Page>({ type: 'landingPage', props: {} })

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
