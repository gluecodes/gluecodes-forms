import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

import '@app/commands/setUrlQueryParam'
import '@app/providers/parseUrlQueryParams'

export default ({
  dateTimeWhenLastClicked,
  label,
  onClick
}) => (
  <div>
    <p className={styles.customizableParagraph}>The last time you clicked the button was: {dateTimeWhenLastClicked || 'never'}</p>
    <button
      className={`${externalStyles.btn} ${externalStyles['btn-primary']}`}
      onclick={() => onClick()}>
      <i className={`${fa.fas} ${fa['fa-fire']}`}/> {label}
    </button>
  </div>
)
