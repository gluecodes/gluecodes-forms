import glueDomPrerenderer from '../../init/glueDomPrerenderer'
import getTestingData from './getTestingData' // eslint-disable-line no-unused-vars
import externalStyles from '@app/styles' // eslint-disable-line no-unused-vars
import fa from '@app/fa' // eslint-disable-line no-unused-vars
import styles from './styles.css' // eslint-disable-line no-unused-vars

export default ({
  getSlot,
  paragraph1Text,
  paragraph2Text
} = getTestingData()) => `
  <div>
    ${
      getSlot({ id: 'paragraph', content: paragraph1Text })(glueDomPrerenderer) || '<p>default paragraph1</p>'
    }
    ${
      getSlot({ id: 'paragraph', content: paragraph2Text })(glueDomPrerenderer) || '<p>default paragraph2</p>'
    }
  </div>
`
