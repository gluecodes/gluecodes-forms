module.exports = require('@gluecodes/components-cli').webpack.components({
  envVariables: {
    ENV: process.env.NODE_ENV,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
  },
  ldScripts: {
    organization: require('./ldScripts/organization.json')
  },
  port: 3535
})
