import { ErrorPage } from './components/ErrorPage'
import { SuccessPage } from './components/SuccessPage'
import { ImagePreview } from './components/ImagePreview'
import { Camera } from './components/Camera'
import { CameraPermissionPage } from './components/CameraPermissionPage'
import { LandingPage } from './components/LandingPage/LandingPage'
import { ApiKeyPage } from './components/ApiKeyPage'
import { usePage } from './providers/PageProvider'

type PageKeys =
  | 'landingPage'
  | 'cameraPermission'
  | 'camera'
  | 'apiKeyForm'
  | 'imagePreview'
  | 'success'
  | 'error'

const PAGES: Record<PageKeys, any> = {
  landingPage: LandingPage,
  cameraPermission: CameraPermissionPage,
  camera: Camera,
  apiKeyForm: ApiKeyPage,
  imagePreview: ImagePreview,
  success: SuccessPage,
  error: ErrorPage,
}

function App() {
  const { currentPage } = usePage()
  console.log('currentPage', currentPage)

  const Page = PAGES[currentPage]

  return <Page />
}

export default App
