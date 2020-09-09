import styles from './styles.css'

const FULL_LOAD_DELAY = 800
let placeholderNode

const initComponent = async ({
  onChanged,
  onFailed,
  reCaptchaNode,
  siteKey
}) => {
  try {
    await (async () => new Promise((resolve, reject) => {
      const scriptNode = global.document.createElement('script')

      scriptNode.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      scriptNode.setAttribute('async', '')
      scriptNode.onload = () => resolve()
      scriptNode.onerror = () => reject(new Error('Could not load Google ReCaptcha'))
      global.document.head.appendChild(scriptNode)
    }))()

    global.grecaptcha.ready(() => {
      global.grecaptcha.render(reCaptchaNode, {
        sitekey: siteKey,
        callback: () => {
          const response = global.grecaptcha.getResponse()

          if (response === '') {
            onFailed(new Error('No response from Google ReCaptcha'))
          } else {
            onChanged(response)
          }
        }
      })
    })

    setTimeout(() => placeholderNode.classList.remove(styles.placeholder), FULL_LOAD_DELAY)
  } catch (err) {
    onFailed(err)
  }
}

export default ({
  onChanged,
  onFailed,
  siteKey
}) => (
  <div className={styles.container} onreset={() => {
    placeholderNode.classList.add(styles.placeholder)
    global.grecaptcha.reset()
    setTimeout(() => placeholderNode.classList.remove(styles.placeholder), FULL_LOAD_DELAY)
  }}>
    <div
      gc-onceDomNodeVisited={(node) => {
        node.classList.add(styles.placeholder)
        placeholderNode = node
      }}/>
    <div
      className="g-recaptcha"
      gc-onceDomNodeVisited={node => (
        initComponent({
          onChanged,
          onFailed,
          reCaptchaNode: node,
          siteKey
        }))}/>
  </div>
)
