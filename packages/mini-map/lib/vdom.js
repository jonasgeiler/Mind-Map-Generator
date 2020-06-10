/**
 * TODO
 * There are a lot of basic elements, which mean they don't have child.
 * It should have more effect way to diff them.
 * Here's an idea:
 * Fist Loop: 
 * 1. Just like before, change nodes whose id are matched.
 * 2. But instead of creating newNode and removing oldNode
 *    that are not matching, we cache them.
 * Second Loop:
 * We use the oldNode's tok as newNode's tok,
 * only create/remove element when neccessary.
 */

// const createElement = (tag) => {
//   console.log('creating element:', tag)
//   return document.createElementNS(ns, tag)
// }
// const createTextElement = (text) => {
//   console.log('creating text element:', text)
//   return document.createTextNode(text)
// }

const ns = 'http://www.w3.org/2000/svg'
const createElement = (tag) => document.createElementNS(ns, tag)
const createTextElement = document.createTextNode.bind(document)
const getKebabCase = (str) => str.replace(/[A-Z]/g, (i) => '-' + i.toLowerCase())

const diff = (newObj, oldObj) => {
  const created = []
  const updated = []
  const deleted = []

  for (const key in newObj) {
    const newValue = newObj[key]
    const oldValue = oldObj[key]
    if (oldValue === undefined) { created.push(key) }
    else if (newValue !== oldValue) { updated.push(key) }
  }

  for (const key in oldObj) {
    const newValue = newObj[key]
    if (newValue === undefined) { deleted.push(key) }
  }

  return [created, updated, deleted]
}

const removeNode = (node) => {
  for (const id in node.children) { removeNode(node.children[id]) }
  node.tok.remove()
  delete node.children
  delete node.attributes
  delete node.tok
}

const renderNode = (node) => {
  if (node.tag === 'txt') {
    node.tok = createTextElement(node.id)
  } else {
    const tok = createElement(node.tag)

    for (const key in node.attributes) {
      tok.setAttribute(getKebabCase(key), node.attributes[key])
    }

    for (const key in node.data) {
      tok.dataset[key] = node.data[key]
    }

    for (const cid in node.children) {
      const child = node.children[cid]
      renderNode(child)
      tok.appendChild(child.tok)
    }

    tok.dataset.id = node.id
    node.tok = tok
  }
}

const compareNode = (node, oldNode) => {
  const tok = oldNode.tok

  const [createdKey, updatedKey, deletedKey] = diff(node.attributes, oldNode.attributes)
  createdKey.forEach((key) => tok.setAttribute(getKebabCase(key), node.attributes[key]))
  updatedKey.forEach((key) => tok.setAttribute(getKebabCase(key), node.attributes[key]))
  deletedKey.forEach((key) => tok.removeAttribute(getKebabCase(key)))

  // TODO Maybe setting dataset directly will be faster
  const [createdDataKey, updatedDataKey, deletedDataKey] = diff(node.data, oldNode.data)
  createdDataKey.forEach((key) => tok.dataset[key] = node.data[key])
  updatedDataKey.forEach((key) => tok.dataset[key] = node.data[key])
  deletedDataKey.forEach((key) => delete tok.dataset[key])

  // TODO Not only the id, but the tag of child should be taken into account
  const [createdId, updatedId, deletedId] = diff(node.children, oldNode.children)

  createdId.forEach((id) => {
    const child = node.children[id]
    renderNode(child)
    tok.appendChild(child.tok)
  })
  updatedId.forEach((id) => compareNode(node.children[id], oldNode.children[id]))
  deletedId.forEach((id) => removeNode(oldNode.children[id]))

  delete oldNode.tok
  node.tok = tok
}

const diffNode = (node, oldNode) => {
  if (!oldNode) { renderNode(node) }
  else { compareNode(node, oldNode) }
}

export const createNode = (id, tag, attributes = {}, data = {}) => {
  return { id, tag, attributes, data, children: {} }
}

export const createTextNode = (txt) => {
  return { id: txt, tag: 'txt', attributes: {}, data: {}, children: {} }
}

export const setAttribute = (node, attrs = {}) => Object.assign(node.attributes, attrs)
export const appendChild = (node, child) => node.children[child.id] = child

let OLD_VDOM = null
let BODY = null
let MOUNTED = false

export const mountVisualDOM = (elm) => {
  if (!elm) { return }

  const needMount = !MOUNTED || BODY !== elm
  if (needMount && OLD_VDOM) {
    elm.appendChild(OLD_VDOM.tok)
    MOUNTED = true
  }
  BODY = elm
}

export const render = (node) => {
  diffNode(node, OLD_VDOM)
  // save node as OLD VDOM for next render to diff
  OLD_VDOM = node
  mountVisualDOM(BODY)
}
