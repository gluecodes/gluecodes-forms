import getTestingData from './getTestingData' // eslint-disable-line no-unused-vars
import externalStyles from '@app/styles' // eslint-disable-line no-unused-vars
import fa from '@app/fa' // eslint-disable-line no-unused-vars
import styles from './styles.css'

export default ({
  example
} = getTestingData()) => `
  <div class="${styles.someClass}">${example}</div>
`
