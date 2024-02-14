import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'

export function Label({ color, children }: { color: string; children: any }) {
  const theme = useTheme()
  return (
    <View
      style={{
        backgroundColor: color,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.l,
        borderRadius: 36,
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: theme.spacing.m,
        alignSelf: 'flex-start',
      }}
    >
      <FontAwesome5 name="trash" size={16} color={theme.colors.foreground} />
      <Text style={[theme.textVariants.body, { color: theme.colors.foreground }]}>{children}</Text>
    </View>
  )
}
