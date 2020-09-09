import glueDomRenderer from '../../init/glueDomRenderer'
import externalStyles from '@app/styles' // eslint-disable-line no-unused-vars
import fa from '@app/fa' // eslint-disable-line no-unused-vars
import styles from './styles.css' // eslint-disable-line no-unused-vars

export default ({
  getSlot,
  paragraph1Text,
  paragraph2Text
}) => (
  <div>
    {
      getSlot({ id: 'paragraph', content: paragraph1Text })(glueDomRenderer) || <p>default paragraph1</p>
    }
    {
      getSlot({ id: 'paragraph', content: paragraph2Text })(glueDomRenderer) || <p>default paragraph2</p>
    }
  </div>
)
