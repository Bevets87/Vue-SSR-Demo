const users = require('../../../server/data/users')
const { setupDB, cleanupDB, seedDB } = require('../helpers')


describe('Users Table', () => {

  beforeAll((done) => {
    setupDB()
    .then(() => seedDB())
    .then(() => done())
  })

  afterAll((done) => {
    cleanupDB()
    .then(() => done())
  })

  
  
  it('can get all', (done) => {
    let limit = 10, offset = 0 
    users.getAll(limit, offset)
    .then(users => {
      expect(users.length).toEqual(10)
      done()
    })
  })

  it('can create one', (done) => {
    const user = { name: 'Steve', password: 'password' }
    users.createOne(user)
    .then((user) => {
      expect(user.name).toBe("Steve")
      done()
    })
  })

 
  
  
 
  
})