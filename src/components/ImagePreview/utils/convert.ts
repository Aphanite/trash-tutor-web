import { OpenAI } from 'openai'

export async function convertAnswer(llmAnswer: string, key: string) {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: "Please analyse and convert the user's message",
      },
      {
        role: 'user',
        content: llmAnswer,
      },
    ],
    temperature: 0,
    max_tokens: 2000,
    tools: [
      {
        type: 'function',
        function: {
          name: 'convert_message_to_json',
          description: `Use this function to convert the user's message into json`,
          parameters: {
            type: 'object',
            properties: {
              itemDetected: {
                type: 'boolean',
                description: 'Indicates if item to dispose of was detected',
              },
              item: {
                type: 'string',
                description: 'Short name of item to be disposed of',
              },
              categoryDetected: {
                type: 'boolean',
                description: 'Indicates if category for item was detected',
              },
              categoryName: {
                type: 'string',
                description:
                  'Chosen waste category for the item written after CATEGORY at the end of the message',
              },
              reason: {
                type: 'string',
                description: 'A short rewrite of the reasoning in the message above',
              },
            },
            required: ['itemDetected', 'item', 'categoryDetected', 'categoryName', 'reason'],
          },
        },
      },
    ],
    tool_choice: {
      type: 'function',
      function: { name: 'convert_message_to_json' },
    },
  })

  const responseMessage = completion.choices[0].message

  // check if the model wanted to call a function
  const toolCall = responseMessage.tool_calls?.[0]

  if (toolCall?.function?.name === 'convert_message_to_json') {
    console.log('Function called!')
    const args = JSON.parse(toolCall.function.arguments)
    const data = { ...args, llmAnswer }
    console.log('data', data)

    if (!args.itemDetected) return { status: 'error', code: 'unidentifiable_object', data }

    if (args.itemDetected && !args.categoryDetected)
      return { status: 'error', code: 'unidentifiable_category', data }

    return { status: 'success', data }
  }

  console.log('no tool call')
  return { status: 'error', code: 'no_tool_call', source: 'convert' }
}
