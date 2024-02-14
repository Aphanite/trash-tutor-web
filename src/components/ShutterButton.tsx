import { StyleSheet, View, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'

export function ShutterButton({
  cameraReady,
  onPress,
}: {
  cameraReady: boolean
  onPress?: () => void
}) {
  const theme = useTheme()
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        disabled={!cameraReady}
        style={[
          styles.shutterButton,
          { backgroundColor: theme.colors.background, opacity: cameraReady ? 1 : 0.5 },
        ]}
      >
        <Ionicons name="scan" size={24} color={theme.colors.foreground} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  shutterButton: {
    width: 50,
    height: 50,
    bottom: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
