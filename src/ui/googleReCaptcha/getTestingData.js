export default () => ({
  onChanged: (response) => {
    console.log('token to be verified on server-side:', response)
  },
  onFailed: (err) => {
    console.log('ReCaptcha failure', err)
  },
  siteKey: global.GOOGLE_RECAPTCHA_SITE_KEY
})
