import getTestingData from './getTestingData'
import externalStyles from '@app/styles'
import styles from './styles.css'

export default ({
  getSlot,
  headline
} = getTestingData()) => `
  <div class="${styles['container-fluid']} ${styles['font-weight-normal']} ${styles.reservationWrapper}">
    <div class="${styles.container} ${styles.headlineContainer}">
      <div class="${externalStyles.row} ${externalStyles['text-center']}">
        <div class="${externalStyles['col-12']} ${styles.headlineBar}">
          <p class="${styles.headline}">${headline}</p>
        </div>
      </div>
     </div>
     <div class="${externalStyles.container} ${styles.contentWrapper}">
      <div class="${externalStyles.row}">
        <div class="${externalStyles['col-lg-4']} ${externalStyles['col-md-6']} ${externalStyles['align-self-center']} ${styles.calendarWrapper}">
           ${getSlot({ id: 'serviceSelector' })}
           ${getSlot({ id: 'calendar' })}
        </div>
        <div class="${externalStyles['col-lg-8']} ${externalStyles['col-md-6']}">
          ${getSlot({ id: 'productDescription' })}
        </div>
      </div>
    </div>
  </div>
`
