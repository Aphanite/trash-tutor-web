import { View, Text } from 'react-native'
import Button from './Button'
import { Page } from './Page'
import { useTheme } from '../hooks/useTheme'

export type ErrorParams = {
  uri: string
  code:
    | 'unidentifiable_object'
    | 'unidentifiable_category'
    | 'multiple_objects'
    | 'no_tool_call'
    | 'internal_server_error'
    | 'connection_error'
    | 'response_not_json'
    | 'invalid_key'
  object?: 'string'
}

export function ErrorPage({
  route: { params },
  navigation,
}: {
  route: { params: ErrorParams }
  navigation: any
}) {
  console.log('params', params)

  const theme = useTheme()
  const isNetworkError = ['connection_error', 'internal_server_error', 'no_tool_call'].includes(
    params.code,
  )
  const invalidApiKey = params.code === 'invalid_key'

  const message = (params => {
    switch (params.code) {
      case 'unidentifiable_object':
        return "We couldn't identify the object on the image. Please try taking a clearer shot."
      case 'multiple_objects':
        return 'Looks like there are multiple objects on the image. Please only scan one at a time!'
      case 'unidentifiable_category':
        return `We couldn't find a waste category that matches: ${params.object?.toLowerCase()}`
      case 'connection_error':
        return "Our service isn't available right now. Check back soon."
      case 'invalid_key':
        return "You didn't provide a valid API Key."
      default:
        return 'Something went wrong. Please try again later.'
    }
  })(params)

  return (
    <Page uri={params.uri}>
      <View
        style={{
          width: '100%',
          rowGap: theme.spacing.l,
        }}
      >
        <View style={{ rowGap: theme.spacing.xs }}>
          <Text style={theme.textVariants.subHeader}>{isNetworkError ? 'Uh oh...' : 'Oops!'}</Text>
          <Text style={theme.textVariants.body}>{message}</Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate(
              invalidApiKey ? 'ApiKeyPage' : isNetworkError ? 'LandingPage' : 'Camera',
            )
          }}
        >
          {invalidApiKey ? 'Enter API Key' : isNetworkError ? 'Go back' : 'Try again'}
        </Button>
      </View>
    </Page>
  )
}
