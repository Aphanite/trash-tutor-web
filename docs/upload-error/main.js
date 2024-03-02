async function uploadToBucket(base64, code) {
  try {
    const { image, contentType } = convertToImage(base64)

    // for development - connect to local worker (don't forget to start it)
    const url = `https://localhost:8787/upload_error/${code}`

    const response = await fetch(url, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': contentType,
      },
    })
    // Log the response
    console.log('File uploaded successfully: ', response)
  } catch (error) {
    // Log any errors
    console.error('Error uploading file: ', error)
  }
}

function convertToBase64() {
  const img = document.querySelector('img')
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = img.width
  canvas.height = img.height

  ctx.drawImage(img, 0, 0, img.width, img.height)

  return canvas.toDataURL('image/png')
}

function convertToImage(base64) {
  let [metaData, data] = base64.split(';')

  let contentType = metaData.split(':')[1]
  let imageExt = contentType.split('/')[1]

  // get the real base64 content of the file
  let realData = data.split(',')[1]

  // convert to blob
  let blob = b64toBlob(realData, contentType)

  return { contentType, image: new File([blob], `photo.${imageExt}`) }
}

function b64toBlob(b64Data, contentType, sliceSize = 512) {
  let byteCharacters = atob(b64Data)
  let byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)

    let byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    let byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  let blob = new Blob(byteArrays, { type: contentType })
  return blob
}

// Execute
console.log('in file')
const exampleCodes = [
  'unidentifiable_object',
  'unidentifiable_category',
  'multiple_objects',
  'no_tool_call',
  'internal_server_error',
  'connection_error',
  'response_not_json',
  'invalid_api_key',
]

const button = document.querySelector('button')

button.addEventListener('click', async e => {
  e.preventDefault()
  console.log('in event')
  // base64 to later mimick behavior in app
  const base64 = convertToBase64()
  console.log('base64', base64)

  const response = await uploadToBucket(base64, exampleCodes[0])
  console.log('response', response)
})
