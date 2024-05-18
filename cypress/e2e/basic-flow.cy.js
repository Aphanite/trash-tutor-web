describe('Full flow', () => {
  beforeEach(() => {
    cy.visit('https://localhost:8080', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
          return Promise.reject(new Error('Permission denied'))
        })
      },
    })

    localStorage.setItem(
      'location',
      JSON.stringify({ city: 'Berlin', country: 'Germany', countryCode: 'de' }),
    )
  })

  it('shows error screen for invalid api key', () => {
    // assert home screen
    cy.contains('Snap, Scan, Sort')
    cy.get('button.primary').should('contain', 'Start').click()

    // assert api-key form screen
    cy.contains('OpenAI Key')
    cy.get('input').type(createFakeKey())
    cy.get('button.primary').should('contain', 'Save and Scan').click()

    // assert how-it-works screen
    cy.contains('How it works')
    cy.get('button.primary').should('contain', 'Next').click()

    // assert camera screen
    cy.get('button[data-cy="shutter-btn"]').click()

    // assert preview screen
    cy.get('button[data-cy="accept-btn"]').click()

    cy.contains('Oops!')
    cy.contains("You didn't provide a valid API Key.")

    cy.get("button:contains('Enter API Key')").click()
    cy.contains('OpenAI Key')
  })
})

describe('success screen', () => {
  beforeEach(() => {
    cy.visit('https://localhost:8080', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').callsFake(() => {
          return Promise.reject(new Error('Permission denied'))
        })
      },
    })

    localStorage.setItem(
      'location',
      JSON.stringify({ city: 'Berlin', country: 'Germany', countryCode: 'de' }),
    )

    cy.intercept('POST', 'https://api.openai.com/v1/chat/completions', {
      statusCode: 200, // A successful status code
      body: {
        // Body should match the expected structure of the API's response
        id: 'example1',
        object: 'chat.completion',
        created: 1589478378,
        model: 'gpt-3.5-turbo',
        choices: [
          {
            message: {
              content: `The item in the photo is an apple, which is organic waste and does not fit into any of the provided waste categories for recycling. Typically, organic waste like fruits would be composted if a composting option is available. Since the provided categories do not include organic or compostable waste, and assuming the apple is no longer edible and must be disposed of, it would fall under the "household" category as it is a non-recyclable item. CATEGORY: household`,
              tool_calls: [
                {
                  function: {
                    name: 'convert_message_to_json',
                    arguments: JSON.stringify({
                      itemDetected: true,
                      item: 'apple',
                      categoryDetected: true,
                      categoryName: 'household',
                      reason:
                        'The apple is organic waste and does not fit into the provided recycling categories. It should be composted, but in the absence of a composting option, it is classified as household waste.',
                    }),
                  },
                },
              ],
            },
          },
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 5,
          total_tokens: 10,
        },
      },
    }).as('fakeOpenAIResponse')
  })

  it('correctly renders success screen', () => {
    // assert home screen
    cy.contains('Snap, Scan, Sort')
    cy.get('button.primary').should('contain', 'Start').click()

    // assert api-key form screen
    cy.contains('OpenAI Key')
    cy.get('input').type(createFakeKey())
    cy.get('button.primary').should('contain', 'Save and Scan').click()

    // assert how-it-works screen
    cy.contains('How it works')
    cy.get('button.primary').should('contain', 'Next').click()

    // assert camera screen
    cy.get('button[data-cy="shutter-btn"]').click()

    // assert preview screen
    cy.get('button[data-cy="accept-btn"]').click()

    // assert result
    cy.contains('How to recycle in Berlin, Germany')
    cy.get('h2:contains("Apple")').should('exist')
    cy.get('[data-cy="waste-label"]').should('contain', 'household').click()

    // assert category screen
    cy.get('h2:contains("Household")').should('exist')
    cy.get('[data-cy="category-description"]').should(
      'contain',
      'Unusable or non-recyclable items such as diapers, cigarettes, and vacuum cleaner bags',
    )

    cy.get('[data-cy="disposal-info"]').should('contain', 'At domestic bin')
  })
})

function createFakeKey() {
  const placeholder = 'keyForTesting1234567'

  return `sk-${placeholder}T3BlbkFJ${placeholder}`
}
