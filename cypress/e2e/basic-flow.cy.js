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

// .callsFake(() => {
//           localStorage.setItem(
//             'location',
//             JSON.stringify({ city: 'Berlin', country: 'Germany', countryCode: 'de' }),
//           )
//         })

function createFakeKey() {
  const placeholder = 'keyForTesting1234567'

  return `sk-${placeholder}T3BlbkFJ${placeholder}`
}
