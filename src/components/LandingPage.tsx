import { StyleSheet, View, Text, Image, Platform } from 'react-native'
import Button from './Button'
import { navigateToCamera } from '../helpers/cameraHelpers'
import { useKey } from '../hooks/useKey'
import { useTheme } from '../hooks/useTheme'
import { Theme } from '../themes/theme'
import { horizontalScale, smallPhone } from '../helpers/metricHelpers'
import { Layout } from './Layout'

export function LandingPage({ navigation }: { navigation: any }) {
  const theme = useTheme()
  const styles = getStyles(theme)
  const apiKey = useKey()

  return (
    <Layout style={[styles.container, Platform.OS === 'web' ? {} : { overflow: 'scroll' }]}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require('../../assets/images/leaves.png')} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: theme.spacing.l,
              flexWrap: 'wrap',
            }}
          >
            <Text style={[theme.textVariants.header, { color: theme.colors.foreground }]}>
              Let's talk
            </Text>
            <Text style={[theme.textVariants.header, { color: theme.colors.primary }]}>
              {' '}
              trash!
            </Text>
          </View>
          <Text
            style={[
              theme.textVariants.body,
              {
                color: theme.colors.foreground,
                flex: 1,
                textAlign: 'center',
              },
            ]}
          >
            {!smallPhone && 'Baffled by bottles and puzzled by plastics?\n\n'}
            Trash Tutor, your friendly AI helper, shows you how to sort your recyclables.
          </Text>
        </View>
      </View>
      <Button
        fullScreen={true}
        type="primary"
        onPress={async () => {
          apiKey ? await navigateToCamera(navigation) : navigation.navigate('ApiKeyPage')
        }}
      >
        Start
      </Button>
    </Layout>
  )
}

function getStyles(theme: Theme) {
  const logoSize = horizontalScale(100)

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.l,
      gap: theme.spacing.l,
      borderRadius: 36,
    },
    imageContainer: {
      flex: 2,
      justifyContent: 'flex-end',
    },
    textContainer: {
      flex: 2,
      justifyContent: 'flex-start',
    },
    logo: {
      width: logoSize > 100 ? 100 : logoSize,
      height: logoSize > 100 ? 100 : logoSize,
    },
  })
}
