import React from 'react'
import { ImageBackground, View } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Layout } from './Layout'

export function Page({ uri, children }: React.PropsWithChildren<{ uri: string }>) {
  const theme = useTheme()

  return (
    <Layout
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground source={{ uri }} style={{ width: '100%', height: '100%' }} id="image-bg" />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          padding: 24,
          position: 'absolute',
          bottom: 0,
          zIndex: 999,
          backgroundColor: theme.colors.foreground,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        id="result-card"
      >
        {children}
      </View>
    </Layout>
  )
}
