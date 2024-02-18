import { PageKey, usePage } from './providers/PageProvider'
import { ImagePreview } from './components/ImagePreview/ImagePreview'
import { LandingPage } from './components/LandingPage/LandingPage'
import ApiKeyPage from './components/ApiKeyPage/ApiKeyPage'
import Camera from './components/Camera/Camera'
import SuccessPage from './components/SuccessPage/SuccessPage'
import ErrorPage from './components/ErrorPage/ErrorPage'

const PAGES: Record<PageKey, any> = {
  landingPage: LandingPage,
  camera: Camera,
  apiKeyForm: ApiKeyPage,
  imagePreview: ImagePreview,
  success: SuccessPage,
  error: ErrorPage,
}

function App() {
  const {
    currentPage: { type, props },
  } = usePage()

  const Page = PAGES[type]

  return <Page {...props} />
}

export default App
