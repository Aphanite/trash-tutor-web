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
    const llmAnswer = await classifyImage(uri, location, wasteCategories, key)
    return await convertAnswer(llmAnswer, key)
  } catch (error) {
    console.log(Object.entries(error))
    console.error('Error when classifying: ', error)

    return {
      status: 'error',
      code: error?.code || 'internal_server_error',
    }
  }
}
