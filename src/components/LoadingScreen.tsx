import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Layout } from './Layout'

export function LoadingScreen() {
  return (
    <Layout style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/leaves.png')} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F8349',
    padding: 24,
    gap: 24,
  },
  logo: {
    width: 100,
    height: 100,
  },
})
