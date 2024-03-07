async function uploadToBucket(uri, code) {
  try {
    // for development - connect to local worker (don't forget to start it)
    const url = `https://localhost:8787/upload_error`

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ uri, code, location: 'Budapest, Hungary' }),
      headers: {
        'Content-Type': 'application/json',
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
  // base64 to later mimick behavior in app
  const base64 = convertToBase64()

  const response = await uploadToBucket(base64, exampleCodes[0])
  console.log('response', response)
})
