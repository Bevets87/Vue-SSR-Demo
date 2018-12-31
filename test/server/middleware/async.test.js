const async = require('../../../server/middleware/async')

describe('Async Middleware', () => {
  let fakeAsyncSuccess, fakeAsyncFailure, req, res
  beforeEach(() => {
    fakeAsyncSuccess = jest.fn().mockResolvedValueOnce({ message: "success" });
    fakeAsyncFailure = jest.fn().mockRejectedValueOnce({ message: "failure" })
    req = {}
    res = {
      status: jest.fn(function () { return this }),
      json: jest.fn(function () { return this })
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  
  it('can wrap an async(req, res) and res.status(200).json(response)', async () => {
    await async.toClient(fakeAsyncSuccess)(req, res)
    
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ message: "success" })
  })

  it('can wrap an async(req, res) and res.status(400).json(error)', async () => {
    try {
      await async.toClient(fakeAsyncFailure)(req, res)
    } catch(error) {
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({ message: "failure" })
    }
  })

  it('can wrap an async(req, res, next) and next()', async () => {
    const next = jest.fn()
    await async.next(fakeAsyncSuccess)(req, res, next)
    
    expect(next).toHaveBeenCalledTimes(1)
    
  })

  

})