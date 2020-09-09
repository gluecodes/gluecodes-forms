import getTestingData from './getTestingData'
import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

export default ({
  label
} = getTestingData()) => `
  <div>
    <p class="${styles.customizableParagraph}">The last time you clicked the button was: </p>
    <button
      class="${externalStyles.btn} ${externalStyles['btn-primary']}">
      <i class="${fa.fas} ${fa['fa-fire']}"></i> ${label}
    </button>
  </div>
`
