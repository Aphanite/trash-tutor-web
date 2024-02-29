export async function uploadToBucket(base64, code, object) {
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
