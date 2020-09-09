import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

export default () => `
  <div class="${styles.calendar} ${externalStyles['text-center']}">
    <div class="${styles.monthSelector}">
      <a href='#' class="${styles.arrow} ${styles.prev}">
        <i class="${fa.fas} ${fa['fa-chevron-left']}"></i>
      </a>
      <h5 class="${styles.headline}"></h5>
      <a href='#' class="${styles.arrow} ${styles.next}">
        <i class="${fa.fas} ${fa['fa-chevron-right']}"></i>
      </a>
    </div>
    <table class="${styles.calendarTable}">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    <br/>
  </div>
`
