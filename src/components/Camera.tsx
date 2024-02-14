import React from 'react'
import { Camera as ExpoCamera, CameraType } from 'expo-camera'
import { View } from 'react-native'
import { ShutterButton } from './ShutterButton'
import { cropPicture } from '../helpers/cameraHelpers'
import { useTheme } from '../hooks/useTheme'
import { useFocusEffect } from '@react-navigation/native'
import { Layout } from './Layout'

export function Camera({ navigation }: { navigation: any }) {
  let camera: ExpoCamera
  const [cameraReady, setCameraReady] = React.useState<boolean>(false)
  const [focused, setFocused] = React.useState<boolean | undefined>(undefined)

  const theme = useTheme()

  async function takePicture() {
    setCameraReady(false)

    const photo = await camera.takePictureAsync()
    const croppedPhoto = await cropPicture(photo)
    navigation.navigate('ImagePreview', { uri: croppedPhoto.uri })

    setCameraReady(true)
  }

  useFocusEffect(
    React.useCallback(() => {
      setFocused(true)

      return () => setFocused(false)
    }, []),
  )

  if (!focused) return <View></View>

  return (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <ExpoCamera
        ref={el => {
          if (el) {
            camera = el
          }
        }}
        type={CameraType.back}
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          padding: theme.spacing.l,
          justifyContent: 'space-between',
        }}
        onCameraReady={() => setCameraReady(true)}
      >
        <ShutterButton cameraReady={cameraReady} onPress={cameraReady ? takePicture : () => {}} />
      </ExpoCamera>
    </Layout>
  )
}
