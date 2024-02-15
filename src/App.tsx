import { ErrorPage } from './components/ErrorPage'
import { SuccessPage } from './components/SuccessPage'
import { ImagePreview } from './components/ImagePreview'
import { CameraPermissionPage } from './components/CameraPermissionPage'
import { LandingPage } from './components/LandingPage/LandingPage'
import ApiKeyPage from './components/ApiKeyPage/ApiKeyPage'
import { PageKey, usePage } from './providers/PageProvider'
import Camera from './components/Camera/Camera'

const PAGES: Record<PageKey, any> = {
  landingPage: LandingPage,
  // cameraPermission: CameraPermissionPage,
  camera: Camera,
  apiKeyForm: ApiKeyPage,
  // imagePreview: ImagePreview,
  // success: SuccessPage,
  // error: ErrorPage,
}

function App() {
  const {
    currentPage: { type, props },
  } = usePage()

  console.log('currentPage', type)

  const Page = PAGES[type]

  return <Page {...props} />
}

export default App
