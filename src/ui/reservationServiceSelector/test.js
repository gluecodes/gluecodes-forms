import renderUi from '../../lib/renderUi'
import component from './index.jsx'
import getTestingData from './getTestingData'

renderUi(component(getTestingData()))
