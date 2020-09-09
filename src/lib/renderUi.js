import diff from 'virtual-dom/diff'
import h from 'virtual-dom/h'
import parser from 'vdom-parser'
import patch from 'virtual-dom/patch'

const vDomState = {
  rootNode: undefined,
  vDomTree: undefined
}

const mountUi = (newVDomTree) => {
  vDomState.rootNode = patch(vDomState.rootNode, diff(vDomState.vDomTree, newVDomTree))
  vDomState.vDomTree = newVDomTree
}

export default (vDomTree) => {
  if (!vDomState.rootNode) {
    const rootNode = global.document.querySelector('#container')

    vDomState.rootNode = rootNode
    vDomState.vDomTree = parser(rootNode)
  }

  mountUi(h('div', { className: 'container' }, [vDomTree]))
}
