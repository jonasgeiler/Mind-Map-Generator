import {
  mountVisualDOM, render,
  createNode, createTextNode, 
  setAttribute, appendChild,
} from './vdom'

import { TOPIC, BOUNDARY, ANGLE_VERT, ANGLE_HORI } from '../constant'

const TEXT_ID = 'TEXT_ID'
const TOPIC_RECT_ID = 'TOPIC_RECT_ID'
const CTX = {}

export const initSVG = (elm, attrs) => {
  CTX.SVG = createNode('SVG', 'svg', attrs)
  CTX.PATH_G = createNode('PATH_G', 'g')
  CTX.BOUNDARY_G = createNode('BOUNDARY_G', 'g')
  CTX.TOPIC_G = createNode('TOPIC_G', 'g')

  appendChild(CTX.SVG, CTX.PATH_G)
  appendChild(CTX.SVG, CTX.BOUNDARY_G)
  appendChild(CTX.SVG, CTX.TOPIC_G)

  mountVisualDOM(elm)

  return CTX.SVG
}

export const renderSVG = () => render(CTX.SVG)

const getD = (p1, p2, style) => {
  switch (style) {
    case ANGLE_VERT:
      return `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y} L ${p2.x} ${p2.y}`
    case ANGLE_HORI:
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p1.y} L ${p2.x} ${p2.y}`
    default:
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
  }
}

export const createPath = (tok) => {
  const { p1, p2 } = tok.generate()
  const { style } = tok
  const d = getD(p1, p2, style)

  // use d as id
  const node = createNode(d, 'path', {
    stroke: 'black',
    fill: 'none',
    d,
  })
  appendChild(CTX.PATH_G, node)
  return node
}

export const createText = (text, pos) => {
  const { content, fontSize, fontFamily } = text
  const attrs = {
    transform: `translate(${pos.x} ${pos.y})`,
    'style': `-moz-transform: translateY(${pos.y + fontSize}px)`,
    fill: '#000',
    fontSize,
    fontFamily,
    'alignment-baseline': 'before-edge',
    // 'dominant-baseline': 'text-before-edge',
  }
  // fix text id, so it won't create unnecessary textElement
  const node = createNode(TEXT_ID, 'text', attrs)
  const txt = createTextNode(content)
  appendChild(node, txt)
  return node
}

export const createTopic = (tok) => {
  const { id, pos, size, color, padding } = tok
  const node = createNode(id, 'g', { transform: `translate(${pos.x} ${pos.y})` }, { type: TOPIC })
  const rect = createNode(TOPIC_RECT_ID, 'rect', {
    ...size,
    stroke: 'black',
    fill: 'white',
    rx: 3,
    ry: 3,
  })
  const text = createText(tok.text, { x: padding[3], y: padding[0] })
  appendChild(node, rect)
  appendChild(node, text)
  appendChild(CTX.TOPIC_G, node)
  return node
}

export const createBoundary = (tok) => {
  const { id, pos, size, color } = tok
  const attrs = {
    ...size,
    fill: color,
    transform: `translate(${pos.x} ${pos.y})`,
    fillOpacity: '0.3',
    rx: 6,
    ry: 6,
  }
  const node = createNode(id, 'rect', attrs, { type: BOUNDARY })
  appendChild(CTX.BOUNDARY_G, node)
  return node
}
