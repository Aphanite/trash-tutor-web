import { ErrorCodes } from '../../helpers/types'
import { usePage } from '../../providers/PageProvider'
import { ResultPage } from '../ResultPage/ResultPage'
import styles from './ErrorPage.module.css'

export type ErrorParams = {
  uri: string
  code: ErrorCodes
  object?: 'string'
}

function ErrorPage({ uri, code, object }: ErrorParams) {
  const { navigate } = usePage()

  const isNetworkError = ['connection_error', 'internal_server_error', 'no_tool_call'].includes(
    code,
  )
  const invalidApiKey = code === 'invalid_api_key'

  const message = (errorCode => {
    switch (errorCode) {
      case 'unidentifiable_object':
        return "We couldn't identify the object on the image. Please try taking a clearer shot."
      case 'multiple_objects':
        return 'Looks like there are multiple objects on the image. Please only scan one at a time!'
      case 'unidentifiable_category':
        return `We couldn't find a waste category that matches: ${object?.toLowerCase()}`
      case 'connection_error':
        return "Our service isn't available right now. Check back soon."
      case 'invalid_api_key':
        return "You didn't provide a valid API Key."
      default:
        return 'Something went wrong. Please try again later.'
    }
  })(code)

  return (
    <ResultPage uri={uri}>
      <div className={styles.errorText}>
        <h2>{isNetworkError ? 'Uh oh...' : 'Oops!'}</h2>
        <p>{message}</p>
      </div>
      <button
        className="btn secondary"
        onClick={() => {
          navigate(invalidApiKey ? 'apiKeyForm' : isNetworkError ? 'landingPage' : 'camera')
        }}
      >
        {invalidApiKey ? 'Enter API Key' : isNetworkError ? 'Go back' : 'Try again'}
      </button>
    </ResultPage>
  )
}

export default ErrorPage
