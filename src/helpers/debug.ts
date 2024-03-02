export async function uploadToBucket(base64: string, code: string) {
  try {
    const { image, contentType } = convertToImage(base64)

    const url = `https://worker.trashtutor.com/upload_error/${code}`

    // for development - connect to local worker
    // const url = `https://localhost:8787/upload_error/${code}`

    const response = await fetch(url, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': contentType,
      },
    })

    console.log('File uploaded successfully: ', response)
  } catch (error) {
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
