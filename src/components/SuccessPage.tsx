import { View, Text } from 'react-native'
import { Label } from './Label'
import Button from './Button'
import { Page } from './Page'
import { useTheme } from '../hooks/useTheme'
import { useLocation } from '../providers/LocationProvider'
import { useWasteContext } from '../providers/WasteCategoriesProvider'

export type SuccessParams = {
  uri: string
  object: string
  categoryName: string
}

export function SuccessPage({
  route: {
    params: { object, categoryName, uri },
  },
  navigation,
}: {
  route: { params: SuccessParams }
  navigation: any
}) {
  const theme = useTheme()
  const location = useLocation()
  const { getCategoriesForLocation } = useWasteContext()

  const wasteCategories = getCategoriesForLocation(location)

  const chosenCategory = wasteCategories?.find(c => {
    return c.categoryName === categoryName
  })

  // is fallback color necessary?
  const binColor = chosenCategory?.binColor || 'null'

  return (
    <Page uri={uri}>
      <View
        style={{
          width: '100%',
          rowGap: theme.spacing.l,
        }}
      >
        <View style={{ rowGap: theme.spacing.xs }}>
          <Text style={[theme.textVariants.small, { color: theme.colors.background }]}>
            How to recycle in {location || 'general'}
          </Text>
          <Text style={[theme.textVariants.subHeader]}>{capitalize(object)}</Text>
          <Label color={theme.wasteColors[binColor]}>{categoryName.toLowerCase()}</Label>
        </View>
        <Text style={[theme.textVariants.small, { color: theme.colors.info }]}>
          Please note: For general guidance only. Confirm with your local service as recycling rules
          may vary.
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Camera')
          }}
        >
          Scan again
        </Button>
      </View>
    </Page>
  )
}

function capitalize(string: string) {
  return string[0].toUpperCase() + string.substring(1)
}
