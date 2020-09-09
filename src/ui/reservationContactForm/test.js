import renderUi from '../../lib/renderUi'
import initFramework from '../../init/framework'

import component, {
  commands,
  pipeline,
  providers,
  reusableFunctions
} from './index.jsx'

import getTestingData from './getTestingData'

const {
  actions,
  runProviders,
  store
} = initFramework({
  commands,
  pipeline,
  providers,
  renderComponent: () => renderUi(component(getTestingData({ actionResults: store, actions }))),
  reusableFunctions
})

;(async () => {
  await runProviders()
  renderUi(component(getTestingData({ actionResults: store, actions })))
})()
