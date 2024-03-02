import { WasteCategory } from './types'

export async function uploadError(data: {
  uri: string
  code: string
  source: 'classifyImage' | 'categorizeWaste'
  categories: WasteCategory[]
  location: string | null
}) {
  try {
    // const url = `https://worker.trashtutor.com/upload_error/${code}`

    // for development - connect to local worker
    const url = `https://localhost:8787/upload_error`

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('File uploaded successfully: ', response)
  } catch (error) {
    console.error('Error uploading file: ', error)
  }
}
