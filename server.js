import { createServer } from 'http'
import url from 'url'
import { createReadStream } from 'fs'
import path from 'path'
import zlib from 'zlib'
import { pipeline } from 'stream'
import { access, constants } from 'fs/promises'
import { platform } from 'os'
import { exec } from 'child_process'
import WebSocketServer from 'websocket/lib/WebSocketServer.js'
import { watch } from 'chokidar'
import { networkInterfaces } from 'os'
const osPlatform = platform()
const port = 9555

const root = 'www'

const ips = []
const interfaces = networkInterfaces()

const log = (msg) => {
  console.log('\x1b[34m\x1b[1m%s', `${msg}`, '\x1b[0m')
}

const httpServer = createServer(async (request, response) => {
  // console.log(`${request.method} ${request.url}`);
  if (request.url.endsWith('/')) request.url = '/index.html'
  // parse URL
  const parsedUrl = url.parse(request.url)
  // extract URL path
  let pathname = `./${path.join(root, parsedUrl.pathname)}`
  // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext
  // maps file extension to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  }

  try {
    await access(pathname, constants.F_OK)
    // read file from file system
    const raw = createReadStream(pathname)
    // Store both a compressed and an uncompressed version of the resource.
    response.setHeader('Vary', 'Accept-Encoding')
    response.setHeader('Content-type', map[ext] || 'text/plain')
    response.setHeader('Cache-Control', 'max-age=1000')
    let acceptEncoding = request.headers['accept-encoding']
    if (!acceptEncoding) {
      acceptEncoding = ''
    }

    const onError = (err) => {
      if (err) {
        // If an error occurs, there's not much we can do because
        // the server has already sent the 200 response code and
        // some amount of data has already been sent to the client.
        // The best we can do is terminate the response immediately
        // and log the error.
        response.end()
        console.error('An error occurred:', err)
      }
    }

    // Note: This is not a conformant accept-encoding parser.
    // See https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
    if (/\bdeflate\b/.test(acceptEncoding)) {
      response.writeHead(200, { 'Content-Encoding': 'deflate' })
      pipeline(raw, zlib.createDeflate(), response, onError)
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      response.writeHead(200, { 'Content-Encoding': 'gzip' })
      pipeline(raw, zlib.createGzip(), response, onError)
    } else if (/\bbr\b/.test(acceptEncoding)) {
      response.writeHead(200, { 'Content-Encoding': 'br' })
      pipeline(raw, zlib.createBrotliCompress(), response, onError)
    } else {
      response.writeHead(200, {})
      pipeline(raw, response, onError)
    }
  } catch (error) {
    response.statusCode = 404
    response.end(`404: ${pathname} not found`)
  }
}).listen(parseInt(port), '0.0.0.0')

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: false
})

const connections = []

wsServer.on('request', function (request) {
  const connection = request.accept('reload-app', request.origin)
  console.log(new Date() + ' Connection accepted.')
  if (connection) connections.push(connection)
  connection.on('close', function (reasonCode, description) {
    connections.splice(connection, 1)
    console.log(new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.')
  })
})

const watcher = watch(['./www/**/*.js'])
let timeout

watcher.on('change', () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    // if (connection && connection.connected) {
    for (const connection of connections) {
      connection && connection.send('reload')
    }

    // }
  }, 100)
})

for (const name in interfaces) {
  if (name === 'Wi-Fi' || name === 'en0' || name === 'en1' || name === 'eth0' || name === 'eth1') {
    for (const { family, address, internal } of interfaces[name])
      if (family === 'IPv4' && !internal) {
        ips.push(address)
      }
  }
}
log(`Server listening on port ${port}`)
log(`Server available on http://localhost:${port}`)

for (const ip of ips) {
  log(`Server available on http://${ip}:${port}`)
}

const _url = `http://localhost:${port}`

log(`opening ${_url}`)

let command

if (osPlatform === 'win32') {
  command = `start microsoft-edge:${_url}`
} else if (osPlatform === 'darwin') {
  command = `open -a "Google Chrome" ${_url}`
} else {
  command = `google-chrome --no-sandbox ${_url}`
}

exec(command)