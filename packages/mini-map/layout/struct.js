import { logErr, isNull, isEven, splitTactic, isEmpty, getRandColor, rand } from '../util'
import { Branch, Group } from './tok'
import { STRUCT_MAP } from './config'
import {
  MAP, LOGIC_R, LOGIC_L, ORG, ORG_UP,
  TREE_L, TREE_R, TIME_V, TIME_UP, TIME_DOWN, TIME_H_UP, TIME_H_DOWN, TIME_H,
  FISH_RIGHT_UP_IN, FISH_RIGHT_DOWN_IN, FISH_LEFT_UP_IN, FISH_LEFT_DOWN_IN,
  FISH_RIGHT_UP, FISH_RIGHT_DOWN, FISH_LEFT_UP, FISH_LEFT_DOWN,
  FISH_RIGHT, FISH_LEFT,
} from '../constant'


const transNode0 = (node, ctx) => {
  const struct = node.struct || STRUCT_MAP[ctx].Child || ctx
  const IN = STRUCT_MAP[ctx].IN
  const OUTS = STRUCT_MAP[struct].OUTS
  const params = { IN, struct }

  const topic = node.tok
  topic.IN = STRUCT_MAP[struct].TopicIN
  if (isNull(node.children) || isEmpty(node.children)) { return new Branch({ elts: [topic], OUTS: [], ...params }) }
  else {
    switch (struct) {
      case MAP: {
        const [right, left] = splitTactic(node.children)
        const rGroup = transList(right, LOGIC_R)
        if (isEmpty(left)) {
          return new Branch({ elts: [topic, rGroup], OUTS: OUTS.slice(0, 1), ...params })
        } else {
          const lGroup = transList(left, LOGIC_L)
          return new Branch({ elts: [topic, rGroup, lGroup], OUTS, ...params })
        }
      }
      default: {
        const group = transList(node.children, struct)
        return new Branch({ elts: [topic, group], OUTS, ...params })
      }
    }
  }
}

export const transNode = (node, ctx = MAP) => {
  const color = 'rgb(190, 190, 244)'
  if (Array.isArray(node)) { return transList(node, ctx, color) }
  else {
    return transNode0(node, ctx)
  }
}

const transInterCreator = (ctxs) => {
  return (node, i) => {
    const ctx = isEven(i) ? ctxs[0] : ctxs[1]
    return transNode(node, ctx)
  }
}

const transList = (nodes, ctx, color) => {

  const getToks = (nodes, ctx) => {
    switch (ctx) {
      case TIME_H: {
        const ctxs = [TIME_H_UP, TIME_H_DOWN]
        const transNode = transInterCreator(ctxs)
        return nodes.map(transNode)
      }

      case TIME_V: {
        const ctxs = [TREE_R, TREE_L]
        const transNode = transInterCreator(ctxs)
        return nodes.map(transNode)
      }

      case FISH_RIGHT: {
        const ctxs = [FISH_RIGHT_UP, FISH_RIGHT_DOWN]
        const transNode = transInterCreator(ctxs)
        return nodes.map(transNode)
      }

      case FISH_LEFT: {
        const ctxs = [FISH_LEFT_UP, FISH_LEFT_DOWN]
        const transNode = transInterCreator(ctxs)
        return nodes.map(transNode)
      }

      default: {
        return nodes.map((node) => transNode(node, ctx))
      }
    }
  }

  const toks = getToks(nodes, ctx)
  const IN = STRUCT_MAP[ctx].GroupIN
  const dir = STRUCT_MAP[ctx].GroupDIR
  const align = STRUCT_MAP[ctx].GroupAlign

  return new Group({ elts: toks, IN, dir, align, color, ctx })
}
