module.exports = require('@gluecodes/components-cli').webpack.prerenders({
  envVariables: {
    ENV: process.env.NODE_ENV
  }
})
