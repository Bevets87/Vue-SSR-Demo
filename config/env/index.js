let envConfig  

if (process.env.NODE_ENV === 'production') {
  envConfig = require('./production')
} else if (process.env.NODE_ENV === 'development') {
  envConfig = require('./development')
} else if (process.env.NODE_ENV === 'testing') {
  envConfig = require('./testing')
} else {
  envConfig = require('./development')
}

module.exports = envConfig 