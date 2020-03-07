import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import https from 'https'
import os from 'os'
import path from 'path'
import yaml from 'yamljs'
import * as api from './api'
import { accessTokenAuth } from './security'
import settings from '../src/settings'

const cliSettings = settings.cliSettings

const iptable: any = {}
const ifaces = os.networkInterfaces()

for (const dev in ifaces) {
  ifaces[dev].forEach(function(details, alias) {
    if (details.family === 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address
    }
  })
}

const host: any = Object.values(iptable).find(item => item !== '127.0.0.1') || 'localhost'

const app = express()
const port = cliSettings.mockPort
const { connector, summarise } = require('swagger-routes-express')

// Compression
app.use(compression())
// Logger
app.use(morgan('dev'))
// Enable CORS
app.use(cors())
// POST, PUT, DELETE body parser
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false
}))
// No cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '-1')
  next()
})

// Read and swagger config file
const apiDefinition = yaml.load(path.resolve(__dirname, 'swagger.yml'))
// Create mock functions based on swaggerConfig
const options = {
  security: {
    AccessTokenAuth: accessTokenAuth
  }
}
const connectSwagger = connector(api, apiDefinition, options)
connectSwagger(app)
// Print swagger router api summary
const apiSummary = summarise(apiDefinition)
console.log(apiSummary)

// Catch 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found')
  res.status(404).json({
    message: err.message,
    error: err
  })
})

// Create HTTP server.
const server = cliSettings.https ? https.createServer(app) : http.createServer(app)

// Listen on provided port, on all network interfaces.
server.listen(port, host)
server.on('error', onError)
console.log('Mock server started on port ' + port + '!')

// Event listener for HTTP server "error" event.
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind)
      process.exit(1)
      break
    default:
      throw error
  }
}
