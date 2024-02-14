import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Feather, EvilIcons } from '@expo/vector-icons'
import { useLocation } from '../providers/LocationProvider'
import { useTheme } from '../hooks/useTheme'
import { LoadingDots } from './LoadingDots'
import { IconButton } from './IconButton'
import { useWasteContext } from '../providers/WasteCategoriesProvider'
import { classifyImage } from '../services/classifyImage'
import { categorizeWaste } from '../services/categorizeWaste'
import { useKey } from '../hooks/useKey'
import { Layout } from './Layout'

export function ImagePreview({
  route: {
    params: { uri },
  },
  navigation,
}: {
  route: { params: { uri: string } }
  navigation: any
}) {
  const theme = useTheme()
  const location = useLocation() || 'Berlin, Germany'
  const key = useKey()

  const { getCategoriesForLocation, saveCategoriesForLocation } = useWasteContext()
  console.log('location', location)

  // if (!isValid(key)) return { status: 'error', code: 'invalid_key' }

  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<any | null>(null) // improve type

  async function analyseImage() {
    let analysisResult
    setLoading(true)

    const categories = getCategoriesForLocation(location)

    // Immediately classify image if categories for location present
    if (categories) {
      analysisResult = await classifyImage(uri, location, categories, key as string)
    } else {
      const {
        status,
        data: fetchedCategories,
        code,
      } = await categorizeWaste(location, key as string)

      if (status === 'success') {
        // Classify image with fetched categories
        analysisResult = await classifyImage(uri, location, fetchedCategories, key as string)
        saveCategoriesForLocation({ [location]: fetchedCategories })
      } else {
        analysisResult = { status, code }
      }
    }

    setResponse(analysisResult)

    setLoading(false)
  }

  React.useEffect(() => {
    if (response === null) return

    const { status, data, code } = response

    if (status === 'success') {
      console.log('category: ', data.category)

      navigation.navigate('SuccessPage', {
        uri,
        object: data.object,
        categoryName: data.category,
      })
    }

    if (status === 'error') {
      console.log('code', code)
      navigation.navigate('ErrorPage', { uri, code, object: data?.object })
    }
  }, [response])

  return (
    <Layout
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground source={{ uri }} style={{ flex: 1 }} id="image-bg" />
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            columnGap: 8,
            padding: 24,
            zIndex: 999,
            position: 'absolute',
          },
          loading
            ? { height: '100%', backgroundColor: theme.colors.background, opacity: 0.4 }
            : { bottom: 0 },
        ]}
        id="button-container"
      >
        {!loading && (
          <>
            {/* Redo image */}
            <IconButton
              style={{ backgroundColor: theme.colors.background }}
              onPress={() => navigation.navigate('Camera')}
            >
              <EvilIcons name="redo" size={20} color={theme.colors.primary} />
            </IconButton>
            {/* Analyse image */}
            <IconButton
              style={{ backgroundColor: theme.colors.primary }}
              onPress={async () => await analyseImage()}
              disabled={!key}
            >
              <Feather name="check" size={16} color={theme.colors.background} />
            </IconButton>
          </>
        )}
        {loading && <LoadingDots />}
      </View>
    </Layout>
  )
}
