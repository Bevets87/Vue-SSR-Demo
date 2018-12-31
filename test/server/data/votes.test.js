const votes = require('../../../server/data/votes')
const { setupDB, cleanupDB, seedDB } = require('../helpers')

const getNotVotedVoterId = (voterIds) => {
  let notVoted = 1
  for (let i = 0; i < voterIds.length; i++) {
    if (notVoted == voterIds[i].voter_id) {
      notVoted++
    } else {
      break 
    }
  }
  return notVoted 
} 

describe('Votes Table', () => {
  beforeAll((done) => {
    setupDB()
    .then(() => seedDB())
    .then(() => done())
  })
  
  afterAll((done) => {
    cleanupDB()
    .then(() => done())
  })

  it('can create one if it does not exist', (done) => {
    
    votes.getAllByPollId(1)
    .then((response) => {
      let notVotedId = getNotVotedVoterId(response) 
      votes.createOne({ voter_id: notVotedId, choice_id: 1, poll_id: 1 })
      return Promise.resolve(notVotedId)
    })
    .then((id) => votes.getAllByVoterId(id))
    .then((response) => {
      expect(response[0].poll_id).toEqual(1)
      done()
    })
  })

})