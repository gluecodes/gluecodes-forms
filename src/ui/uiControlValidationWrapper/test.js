import renderer from '../../init/renderer'
import renderUi from '../../lib/renderUi'
import component from './index.jsx'
import getTestingData from './getTestingData'

renderUi(renderer('div', {},
  component(getTestingData({ isCalledByPrerender: false })),
  renderer('button', { // for testing reset forwarding
    onclick: (e) => {
      const resetEvent = new Event('reset', { bubbles: false, cancelable: false })

      resetEvent.initialValue = ''
      e.target.previousSibling.dispatchEvent(resetEvent)
    }
  }, 'Reset UI Control')
))
