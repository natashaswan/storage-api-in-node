// You are welcome to drop express for any other server implementation
const express = require('express')
const server = express()
//controllers functions
const uploadController = require('./controllers/uploadController');
const downloadController = require('./controllers/downloadController');
const deleteController = require('./controllers/deleteController');

// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server

// We'll store the data in memory
const storage = {};

if (require.main === module) {
  // Start server only when we run this on the command line and explicitly ignore this while testing

  server.put('/data/:repository', uploadController);
  server.get('/data/:repository/:id', downloadController);
  server.delete('/data/:repository/:id', deleteController);
  
  const port = process.env.PORT || 3000
  server.listen((port), () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}
