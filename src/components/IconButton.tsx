import React from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export function IconButton({
  style,
  onPress,
  disabled = false,
  children,
}: React.PropsWithChildren<{
  style: StyleProp<ViewStyle>
  onPress: (arg0: any) => void
  disabled?: boolean
}>) {
  const theme = useTheme()

  return (
    <Pressable
      style={[
        style,
        {
          flex: 1,
          borderRadius: 36,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: theme.spacing.s,
          paddingHorizontal: theme.spacing.m,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Pressable>
  )
}
