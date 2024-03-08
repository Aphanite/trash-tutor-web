import { WasteCategory } from '../../../helpers/types'
import { classifyImage } from './classifyImage'
import { convertAnswer } from './convert'

export async function classify(
  uri: string,
  location: string,
  wasteCategories: WasteCategory[],
  key: string,
) {
  try {
    // const llmAnswer = await classifyImage(uri, location, wasteCategories, key)
    // const json = await convertAnswer(llmAnswer, key)
    // console.log('json', json)
    return {
      status: 'success',
      data: {
        itemDetected: true,
        item: 'yellow plastic container',
        categoryDetected: true,
        categoryName: 'packaging',
        reason:
          'The container is made of plastic and used for transporting mail or packages, and should be recycled in the packaging category if clean and free of hazardous materials.',
      },
    }
  } catch (error) {
    console.log(Object.entries(error))
    console.error('Error when classifying: ', error)

    return {
      status: 'error',
      code: error?.code || 'internal_server_error',
    }
  }
}
