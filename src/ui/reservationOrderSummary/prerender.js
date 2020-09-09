import getTestingData from './getTestingData'
import externalStyles from '@app/styles'
import styles from './styles.css'

export default ({
  headline,
  items
} = getTestingData()) => `
    <div class="${externalStyles.row} ${externalStyles['text-center']} ${externalStyles['justify-content-center']}">
      <div class="${externalStyles['col-md-12']}">
        <h4 class="${styles.headline}">${headline}</h4>
      </div>
      ${
        items.map(item => (`
          <a
            href="${item.href}"
            class="${styles.item} ${externalStyles['col-md-3']}">
            <div class="${styles.gradient}"></div>
            <img class="${styles.image}" src="${item.image}" alt="${item.title}"/>
            <span class="${styles.itemTitle}">${item.title}</span>
          </a>
        `)).join('')
      }
    </div>
`
