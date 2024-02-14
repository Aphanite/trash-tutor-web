import { OpenAI } from 'openai'

export async function categorizeWaste(location: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

  const systemInstruction = `Role: You are an expert in Waste Categorization within the Waste Management System of ${location}.`
  const categorizationUserInstruction = `What are the waste bin categories in ${location}?` // `What are the waste bin categories in ${location} and what types of waste are designated for each bin?`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content: systemInstruction,
        },
        {
          role: 'user',
          content: categorizationUserInstruction,
        },
      ],
      temperature: 0,
      max_tokens: 300,
      tools: [
        {
          type: 'function',
          function: {
            name: 'save_waste_categories',
            description: `Use this function to save the waste categories used in ${location}`,
            parameters: {
              type: 'object',
              properties: {
                wasteCategories: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      categoryName: {
                        type: 'string',
                        description: 'Short name of the waste category, not more than one word',
                      },
                      binColor: {
                        type: 'string',
                        description: 'Bin color for this waste category',
                        enum: ['blue', 'green', 'yellow', 'red', 'brown', 'black', 'grey', null],
                      },
                      description: {
                        type: 'string',
                        description:
                          'Short explanation which waste types are intended to be disposed in this category',
                      },
                    },
                    required: ['categoryName', 'binColor', 'description'],
                  },
                },
              },
              required: ['wasteCategories'],
            },
          },
        },
      ],
      tool_choice: {
        type: 'function',
        function: { name: 'save_waste_categories' },
      },
    })

    const responseMessage = response.choices[0].message
    console.log('responseMessage:', responseMessage)

    // check if the model wanted to call a function
    const toolCall = responseMessage.tool_calls?.[0]

    console.log('toolCall:', toolCall)
    console.log('function:', toolCall?.function)

    if (toolCall?.function?.name === 'save_waste_categories') {
      const { wasteCategories } = JSON.parse(toolCall.function.arguments)
      console.log('wasteCategories:', wasteCategories)

      return { status: 'success', data: wasteCategories }
    }

    return { status: 'error', code: 'no_tool_call' }
  } catch (error) {
    console.error('Error when categorizing waste: ', error)
    return { status: 'error', code: 'internal_server_error' }
  }
}
