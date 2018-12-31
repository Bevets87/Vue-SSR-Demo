const toClient = (async) => (req, res) => {
  async(req, res)
    .then((response) => { res.status(200).json(response) })
    .catch((error) => { res.status(400).json(error) })
}

const next = (async) => (req, res, next) => {
  async(req, res)
  .then(() => { next() })
  .catch((error) => { res.status(400).json(error) })
}

module.exports = {
  toClient, 
  next 
} 