import { logErr, uuid, posAdd, isDef, getRandColor, getTextSize } from '../util'
import { getTopicJoint, getGroupJoint, getBranchJoint, getRelPos } from './layoutUtil'
import { CONN_GAP, BRANCH_PADDING } from './config'
import {
  TOPIC, BRANCH, GROUP, CONN,
} from '../constant'

class Tok {
  constructor (opts) {
    this.id = opts.id || uuid()
    this.pos = opts.pos || { x: 0, y: 0 }
    this.size = opts.size || { width: 0, height: 0 }
    this.text = opts.text

    this.padding = opts.padding || [0, 0, 0, 0]
    this.margin = opts.margin || [0, 0, 0, 0]
    const [top, right, bottom, left] = this.padding
    this.size.width += left + right
    this.size.height += top + bottom

    this.elts = opts.elts || []
    this.elts.forEach((elt) => elt.parent = this)

    this.IN = opts.IN
  }

  getJoint () { logErr('Undefined method', this.getJoint, this) }

}

export class Topic extends Tok {

  constructor (opts) {
    super(opts)
    this.type = TOPIC
    this.color = opts.color
  }

  getJoint () {
    const IN = isDef(this.IN) ? this.IN : this.parent.IN
    return getTopicJoint(this, IN)
  }

  getTopic () { return this }

}

export class Group extends Tok {
  constructor (opts) {
    super(opts)
    this.type = GROUP
    this.dir = opts.dir
    this.align = opts.align
    this.color = opts.color
  }

  getJoint() {
    return getGroupJoint(this, this.IN)
  }

  getTopic () { return this.elts[0].getTopic() }

  getTopics () { return this.elts.map((t) => t.getTopic()) }

  getChildJoint (dir) {
    // TODO use dir to get index of elts
    const topic = this.elts[this.elts.length-1]
    const joint = getTopicJoint(topic, dir)
    return posAdd(getRelPos(topic, this), joint)
  }

}

export class Branch extends Tok {
  constructor (opts) {
    super(opts)
    this.type = BRANCH
    this.OUTS = opts.OUTS
    this.struct = opts.struct
    this.padding = opts.padding || [...BRANCH_PADDING]
  }

  getJoint () { return getBranchJoint(this, this.IN) }

  getTopic () { return this.elts[0] }

  getChildJoint (dir) {
    const topic = this.getTopic()
    const joint = getTopicJoint(topic, dir)
    return posAdd(getRelPos(topic, this), joint)
  }

  getOutPoints () {
    const topic = this.getTopic()
    return this.OUTS.map((out) => getTopicJoint(topic, out, CONN_GAP))
  }

  createOutConns () {
    const topic = this.getTopic()
    return this.OUTS.map((out) => {
      const p1 = { tok: topic, pos: getTopicJoint(topic, out) }
      const p2 = { tok: topic, pos: getTopicJoint(topic, out, CONN_GAP) }
      return new Conn(p1, p2)
    })
  }

}

export class Conn {
  constructor (p1, p2, opts = {}) {
    this.points = [p1, p2]
    this.type = CONN
    this.style = opts.style
    this.dir = opts.dir
  }

  generate () {
    const posArr = this.points.map((p) => posAdd(p.tok.pos, p.pos))
    return {
      p1: posArr[0],
      p2: posArr[1],
    }
  }
}

export const isBranch = (tok) => tok.type === BRANCH
export const isGroup = (tok) => tok.type === GROUP
export const isTopic = (tok) => tok.type === TOPIC
export const isPhantom = (tok) => !tok.color

export const createTok = (node, defaultStyle) => {
  const text = Object.assign({}, defaultStyle.text, node.text)
  const size = getTextSize(text.content, text)

  return new Topic({
    id: node.id,
    size: Object.assign({}, size),
    margin: [5, 5, 5, 5],
    color: node.color || getRandColor(),
    text,
    padding: node.padding || defaultStyle.padding,
  })
}
