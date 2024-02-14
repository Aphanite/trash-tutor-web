import { ImageResult, manipulateAsync } from 'expo-image-manipulator'
import { Camera, CameraCapturedPicture } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

export async function pickImage() {
  // No permissions request is necessary for launching the image library
  let { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true,
  })

  return canceled ? { canceled } : { canceled, uri: assets?.[0].uri }
}

export async function navigateToCamera(navigation: any) {
  try {
    const permission = await Camera.getCameraPermissionsAsync()

    return navigation.navigate(permission.granted ? 'Camera' : 'CameraPermissionPage')
  } catch (_error) {
    const { canceled, uri } = await pickImage()

    if (canceled) return
    return navigation.navigate('ImagePreview', { uri })
  }
}

export async function cropPicture(photo: CameraCapturedPicture): Promise<ImageResult> {
  const { width, height } = photo

  let windowAspectRatio = window.innerWidth / window.innerHeight
  let imageAspectRatio = width / height

  // no cropping required if window and image have same aspect ratio
  if (windowAspectRatio === imageAspectRatio) return photo

  const newWidth = windowAspectRatio * height

  if (newWidth > width) {
    console.error('New width is greater than the original image width. Crop aborted.')
    return photo
  }

  // crop image's center
  return await manipulateAsync(photo.uri, [
    {
      crop: {
        height: height,
        originX: calculateOriginX(width, newWidth),
        originY: 0,
        width: newWidth,
      },
    },
  ])
}

// finds X coordinate for crop start, ensuring the original image's center stays centered
function calculateOriginX(oldWidth: number, newWidth: number) {
  return Math.max(0, Math.floor(oldWidth / 2) - Math.floor(newWidth / 2))
}
