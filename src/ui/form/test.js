import renderUi from '../../lib/renderUi'
import initFramework from '../../init/framework'
import component from './index.jsx'

import getTestingData, { testCommands, testStore } from './getTestingData'

const { actions, addCommand, store } = initFramework({
  renderComponent: () => renderUi(renderComponent(props))
})

const actionResults = Object.assign(store, testStore)

const props = getTestingData({
  actionResults,
  actions
})

const registry = {
  initialValuesCopy: undefined,
  inputDomNodes: {}
}

const renderComponent = props => component(registry)(props)

Object.keys(testCommands).forEach((commandName) => {
  addCommand({
    code: testCommands[commandName],
    commandName
  })
})

renderUi(renderComponent(props))
