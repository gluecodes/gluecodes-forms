import styles from './styles.css'

export default () => `
  <div class="${styles.productWrapper}">
    <h4 class="${styles.headline}"></h4>
    <hr class="${styles.breakLine}"/>
    <div class="${styles.contentWrapper}">
      <div class="${styles.descriptionWrapper}">
        <p class="${styles.summary}"></p>
        <p class="${styles.fullDescription}"></p>
      </div>
      <div class="${styles.imageWrapper}">
      </div>
    </div>
  </div>
`
