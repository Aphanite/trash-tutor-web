// './test-img/test.JPG'
export function convertToBase64(filePath) {
  const img = fs.readFileSync(filePath)
  const base64String = Buffer.from(img).toString('base64')
  return 'data:image/jpeg;base64,' + base64String
}

export function convertToImage(base64) {
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
