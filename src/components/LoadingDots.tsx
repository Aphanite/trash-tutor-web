import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export function LoadingDots() {
  const theme = useTheme()

  const dotOpacity1 = React.useRef(new Animated.Value(0)).current
  const dotOpacity2 = React.useRef(new Animated.Value(0)).current
  const dotOpacity3 = React.useRef(new Animated.Value(0)).current

  function animateDot(dotOpacity: Animated.Value) {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(dotOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    )
  }

  React.useEffect(() => {
    const animation1 = animateDot(dotOpacity1)
    const animation2 = animateDot(dotOpacity2)
    const animation3 = animateDot(dotOpacity3)

    animation1.start()

    const timer2 = setTimeout(() => {
      animation2.start()
    }, 200)

    const timer3 = setTimeout(() => {
      animation3.start()
    }, 400)

    return () => {
      ;[animation1, animation2, animation3].forEach(animation => animation.stop())
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          gap: theme.spacing.m,
        },
      ]}
    >
      <Animated.View
        style={[styles.box, { opacity: dotOpacity1, backgroundColor: theme.colors.primary }]}
      ></Animated.View>
      <Animated.View
        style={[styles.box, { opacity: dotOpacity2, backgroundColor: theme.colors.primary }]}
      ></Animated.View>
      <Animated.View
        style={[styles.box, { opacity: dotOpacity3, backgroundColor: theme.colors.primary }]}
      ></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 20,
    width: 20,
    borderRadius: 50,
  },
})
