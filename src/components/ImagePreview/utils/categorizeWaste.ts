import { OpenAI } from 'openai'

export async function categorizeWaste(location: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

  const systemInstruction = `Role: You are an expert in Waste Categorization within the Waste Management System of ${location}.`
  const categorizationUserInstruction = `What are the waste categories in ${location} and what types of waste are designated for each bin?`

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
      max_tokens: 2000,
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
                      domestic: {
                        type: 'boolean',
                        description:
                          'Boolean indicating whether waste category can be disposed of at home (true) or if it requires disposal at a public drop-off or a specialized collection point (false). Usually only general house hold waste, paper and plastic can be disposed of at home.',
                      },
                    },
                    required: ['categoryName', 'binColor', 'description', 'domestic'],
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

    // check if the model wanted to call a function
    const toolCall = responseMessage.tool_calls?.[0]

    if (toolCall?.function?.name === 'save_waste_categories') {
      const { wasteCategories } = JSON.parse(toolCall.function.arguments)

      return { status: 'success', data: wasteCategories }
    }

    return { status: 'error', code: 'no_tool_call' }
  } catch (error: any) {
    console.error('Error when categorizing waste: ', error)
    return { status: 'error', code: error?.code || 'internal_server_error' }
  }
}
