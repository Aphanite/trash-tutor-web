import { OpenAI } from 'openai'
import { WasteCategory } from '../../../helpers/types'

export async function classifyImage(
  uri: string,
  location: string,
  wasteCategories: WasteCategory[],
  key: string,
) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

  const categories = wasteCategories.map(({ categoryName, description }) => {
    return { categoryName, description }
  })

  const systemInstruction = `You are an expert assisting the user with domestic waste sorting.
The user's location is ${location}.
The following waste categories are available: ${JSON.stringify(categories)}
The user uploads a photo of an item and your task is to figure out what exactly the item is made of and select which would be the best waste category to dispose of it.
In case multiple items are visible on the photo, please choose the biggest one or the most likely one to be thrown into a bin.
If there is no directly matching category for the item, please select "household", as long as the item is not hazardous and not bulky.
Do not categorise any living being or part of it.
First, include a short reasoning about why this item needs to be disposed of this way.
Finally, finish your answer with: CATEGORY and the name of the waste category.`

  const imageCompletion = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content: systemInstruction,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: uri,
              detail: 'low',
            },
          },
        ],
      },
    ],
    temperature: 0,
    max_tokens: 2000,
  })

  const result = imageCompletion?.choices?.[0]?.message?.content
  console.log('result', result)

  return result
}
