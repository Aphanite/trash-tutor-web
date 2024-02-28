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

  const systemInstruction = `You will be provided with an image and a list of waste categories in ${location}.
  A waste category is an object with two props: 'categoryName' and 'description', i.e. a materials description for the category.

  Use the following step-by-step instructions to respond to user inputs.

  Step 1 - Identify the object in focus on the image and the material it is made of. Really look closely!

  Step 2 - Assign the object to the matching waste category in ${location}.

  Always return a json of the following output formats!

  Output format:
  1. If successful: {"status": "success", "data": {"object": "_OBJECT NAME_", "category": "_CATEGORY NAME_"}}

  2. If the object on the image can't be identified: {"status": "error","code": "unidentifiable_object"}

  3. If the image shows various objects not of the same type: {"status": "error","code": "multiple_objects"}

  4. If object on the image is idenifiable but you can't assign a matching waste category: {"status": "error", "code": "unidentifiable_category", "data": {"object": "_OBJECT NAME_"}}

  5. If there's any other error: {"status": "error", code: "Something went wrong"}

  Do your best and really stick to the output format! My career depends on it!
  `

  const userPrompt = `Waste categories in ${location}: ${JSON.stringify(categories)}`
  try {
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
              type: 'text',
              text: userPrompt,
            },
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
    const parsedResult = result
      ? JSON.parse(result)
      : { status: 'error', code: 'response_not_json' }

    return parsedResult
  } catch (error) {
    console.log(Object.entries(error))
    console.error('Error when categorizing waste: ', error)
    return { status: 'error', code: error?.code || 'internal_server_error' }
  }
}
