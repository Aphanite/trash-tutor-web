import React from 'react'
import { StyleSheet, View, Pressable, Text, TextStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export default function Button({
  children,
  type,
  onPress,
  disabled = false,
  fullScreen = false,
}: React.PropsWithChildren<{
  type?: string
  onPress?: (arg0: any) => void
  disabled?: boolean
  fullScreen?: boolean
}>) {
  const theme = useTheme()

  const { primary, background } = theme.colors

  return (
    <View style={[styles.buttonContainer, fullScreen ? { width: '100%' } : {}]}>
      <Pressable
        style={[
          styles.button,
          type === 'primary'
            ? { backgroundColor: primary }
            : { borderColor: background, borderWidth: 1 },
          { opacity: disabled ? 0.5 : 1 },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={
            [
              theme.textVariants.body,
              {
                color: background,
                padding: theme.spacing.m,
              },
            ] as TextStyle
          }
        >
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  button: {
    borderRadius: 36,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})
