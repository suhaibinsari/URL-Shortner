const mongoose = require("mongoose")

async function connectToMongoDB(url) {
  return mongoose.connect(url)
    .then(() => {
      console.log('DB Connection Sucessful')
    })
    .catch(() => {
      console.log('DB Connection Failed')
    })
}

module.exports = {
  connectToMongoDB
}