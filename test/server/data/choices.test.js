const { setupDB, cleanupDB, seedDB } = require('../helpers')
const choices = require('../../../server/data/choices')

describe('Choices Table', () => {

  beforeAll((done) => {
    setupDB()
      .then(() => seedDB())
      .then(() => done())
  })

  afterAll((done) => {
    cleanupDB()
      .then(() => done())
  })

  it('can getAllByPollId(id) with id, value, and votes fields', (done) => {
    choices.getAllByPollId(1)
    .then((choices) => {
     
      expect(choices.length).toEqual(3)
      expect(choices[0].id).toBeTruthy()
      expect(choices[0].value).toBeTruthy()
      expect(choices[0].votes).toBeTruthy()
      done()
    })

  })
})