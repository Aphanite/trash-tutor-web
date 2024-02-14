import { StyleSheet, View, Image, Text } from 'react-native'
import { Camera as ExpoCamera, PermissionResponse } from 'expo-camera'
import Button from './Button'
import { useTheme } from '../hooks/useTheme'
import { Layout } from './Layout'

export function CameraPermissionPage({ navigation }: { navigation: any }) {
  const theme = useTheme()

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.colors.foreground,
      }}
    >
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: theme.spacing.m }}
      >
        <Image
          style={{
            width: 150,
            height: 104,
          }}
          source={require('../../assets/images/camera.png')}
        />
        <Text style={[theme.textVariants.subHeader, { color: theme.colors.background }]}>
          Camera Access
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text
          style={[
            theme.textVariants.body,
            {
              marginHorizontal: theme.spacing.xl,
              marginTop: theme.spacing.m,
              textAlign: 'center',
              color: theme.colors.background,
            },
          ]}
        >
          To capture photos, allow Trash Tutor to use your camera
        </Text>
        <View style={{ margin: theme.spacing.l }}>
          <Button
            fullScreen={true}
            type="primary"
            onPress={() => {
              ExpoCamera.requestCameraPermissionsAsync().then((permission: PermissionResponse) => {
                permission.granted && navigation.navigate('Camera')
              })
            }}
          >
            Allow
          </Button>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3F8349',
    textAlign: 'center',
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3F8349',
    textAlign: 'center',
    paddingBottom: 20,
  },
  confirmButtonContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
    paddingTop: 3,
    paddingHorizontal: 3,
  },
  confirmButton: {
    borderRadius: 36,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  confirmButtonLabel: {
    padding: 16,
    fontSize: 16,
  },
})
