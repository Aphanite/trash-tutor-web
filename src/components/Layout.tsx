import { View } from 'react-native'

export function Layout({ style, children }: React.PropsWithChildren<{ style: any }>) {
  return (
    // id to add border radius on laptop/desktop screens inside index.html
    <View style={style} id="layout">
      {children}
    </View>
  )
}
