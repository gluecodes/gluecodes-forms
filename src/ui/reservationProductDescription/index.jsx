import styles from './styles.css'

export default ({
  fullDescription,
  headline,
  summary,
  image
}) => (
  <div className={styles.productWrapper}>
    <h4 className={styles.headline}>{headline}</h4>
    <hr className={styles.breakLine}/>
    <div className={styles.contentWrapper}>
      <div className={styles.descriptionWrapper}>
        <p className={styles.summary}>{summary}</p>
        <p className={styles.fullDescription}>{fullDescription}</p>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.gradient}/>
        <img src={image.src} alt={image.alternateText} className={styles.image}/>
      </div>
    </div>
  </div>
)
