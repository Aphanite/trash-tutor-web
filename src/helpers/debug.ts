export async function uploadToBucket(base64: string, code: string, object?: string) {
  try {
    const { image, contentType } = convertToImage(base64)

    const timestamp = new Date().toISOString().replace(/[-:.Z]/g, '')

    // for production - connect to deployed Cloudflare worker
    // const production_url = `https://worker.trashtutor.com/upload_error_${timestamp}`

    // for development - connect to local worker (don't forget to start it)
    const url = `http://192.168.1.45:8787/upload_error_${timestamp}`

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ image, code, object }),
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

function convertToImage(base64: string) {
  let [metaData, data] = base64.split(';')

  let contentType = metaData.split(':')[1]
  let imageExt = contentType.split('/')[1]

  // get the real base64 content of the file
  let realData = data.split(',')[1]

  // convert to blob
  let blob = b64toBlob(realData, contentType)

  return { contentType, image: new File([blob], `photo.${imageExt}`) }
}

function b64toBlob(b64Data: string, contentType: string, sliceSize = 512) {
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
