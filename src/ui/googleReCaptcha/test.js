import renderUi from '../../lib/renderUi'
import component from './index.jsx'
import getTestingData from './getTestingData'

renderUi(component(getTestingData()))

/*
// on server-side:

const https = require('https')
const querystring = require('querystring')

const secretKey = process.env.GOOGLE_RE_CAPTCHA_SECRET_KEY

const verifyCaptchaToken = async token => new Promise((resolve, reject) => {
  const postData = querystring.stringify({
    secret: secretKey,
    response: token
  })

  const options = {
    port: 443,
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const responseBodyChunks = []

  const req = https.request(options, (res) => {
    if (res.statusCode !== 200) {
      reject(new Error('Invalid captcha verification response'))
    }

    res.setEncoding('utf8')

    res.on('data', (chunk) => {
      responseBodyChunks.push(chunk.toString())
    })

    res.on('end', () => {
      try {
        resolve(JSON.parse(responseBodyChunks.join('')))
      } catch (err) {
        reject(err)
      }
    })
  })

  req.on('error', reject)
  req.write(postData)
  req.end()
})

try {
  const response = await verifyCaptchaToken(token)

  if (!response.success) {
    // success
  } else {
    // failure
  }
} catch (err) {
  // other error while communication with google recaptcha
}
*/
