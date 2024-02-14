import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const smallPhone = height < 600

// iPhone 12 Pro Dimensions
const referenceWidth = 390
const referenceHeight = 844

// Scales value based on the screen width/height in relation to reference width/height
const horizontalScale = (size: number) => (width / referenceWidth) * size
const verticalScale = (size: number) => (height / referenceHeight) * size

export { smallPhone, horizontalScale, verticalScale }
