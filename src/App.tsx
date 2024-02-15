import React from 'react'
import { ErrorPage } from './components/ErrorPage'
import { SuccessPage } from './components/SuccessPage'
import { ImagePreview } from './components/ImagePreview'
import { Camera } from './components/Camera'
import { CameraPermissionPage } from './components/CameraPermissionPage'
import { LandingPage } from './components/LandingPage/LandingPage'
import { ApiKeyPage } from './components/ApiKeyPage'

type PageKeys =
  | 'landing-page'
  | 'camera-permission'
  | 'camera'
  | 'api-key-form'
  | 'image-preview'
  | 'success'
  | 'error'

const PAGES: Record<PageKeys, any> = {
  'landing-page': LandingPage,
  'camera-permission': CameraPermissionPage,
  camera: Camera,
  'api-key-form': ApiKeyPage,
  'image-preview': ImagePreview,
  success: SuccessPage,
  error: ErrorPage,
}

function App() {
  const [currentPage, setCurrentPage] = React.useState<PageKeys>('landing-page')

  const Page = PAGES[currentPage]

  return (
    <Page
      onNavigate={(page: PageKeys) => {
        setCurrentPage(page)
      }}
    />
  )
}

export default App
