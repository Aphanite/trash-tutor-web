import fs from 'fs'

export async function uploadToBucket(filePath, code, object) {
  try {
    const img = fs.readFileSync(filePath)
    console.log('image', img)

    const timestamp = new Date().toISOString().replace(/[-:.Z]/g, '')

    const url = `http://127.0.0.1:8787/upload_error_${timestamp}`

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ img, code, object }),
      headers: { 'Content-Type': 'application/json' },
    })
    // Log the response
    console.log('File uploaded successfully: ', response)
  } catch (error) {
    // Log any errors
    console.error('Error uploading file: ', error)
  }
}
