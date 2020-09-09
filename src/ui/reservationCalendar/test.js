import renderUi from '../../lib/renderUi'
import initFramework from '../../init/framework'
import component from './index.jsx'
import getTestingData from './getTestingData'

const {
  actions,
  addCommand,
  store
} = initFramework({
  renderComponent: () => renderComponent()
})

const renderComponent = () => (
  renderUi(component(getTestingData({
    actionResults: store,
    actions
  })))
)

store.changeDate = {}

addCommand({
  code: (day, month, year) => ({ day, month, year }),
  commandName: 'changeDate'
})

renderComponent()
