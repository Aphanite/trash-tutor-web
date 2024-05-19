import { LocationObject } from '../providers/LocationProvider'
import { ErrorCodes, WasteCategory } from './types'

export async function uploadError(
  uri: string,
  data: {
    result: {
      status: 'error'
      code: ErrorCodes
      data?: {
        itemDetected: boolean
        item: string
        categoryDetected: boolean
        categoryName: string
        reason: string
      }
      source?: 'classifyImage' | 'categorizeWaste'
    }
    metaData: { categories: WasteCategory[]; location: LocationObject | null }
  },
) {
  try {
    if (data.result.code === 'invalid_api_key') return

    const response = await fetch('https://worker.trashtutor.com/upload_error', {
      method: 'PUT',
      body: JSON.stringify({ uri, ...data }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('File uploaded successfully: ', response)
  } catch (error) {
    console.error('Error uploading file: ', error)
  }
}
