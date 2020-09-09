import externalStyles from '@app/styles'
import styles from './styles.css'

export default ({
  headline,
  items
}) => (
  <div className={`${externalStyles.row} ${externalStyles['text-center']} ${externalStyles['justify-content-center']}`}>
    <div className={`${externalStyles['col-md-12']}`}>
      <h4 className={styles.headline}>{headline}</h4>
    </div>
    {
      items.map(item => (
        <a
          href={item.href}
          className={`${styles.item} ${externalStyles['col-md-3']}`}>
          <div className={styles.gradient}></div>
          <img className={styles.image} src={item.image} alt={item.title}/>
          <span className={styles.itemTitle}>{item.title}</span>
        </a>
      ))
    }
  </div>
)
