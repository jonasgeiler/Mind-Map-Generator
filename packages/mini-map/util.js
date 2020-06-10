import {
  UP, RIGHT, DOWN, LEFT,
  LEFT_UP, LEFT_DOWN, RIGHT_DOWN, RIGHT_UP,
} from './constant'

export const isArray = (obj) => obj.length !== undefined
export const isUndef = (v) => v === undefined || v === null
export const isDef = (v) => v !== undefined && v !== null

export const isEven = (n) => n % 2 === 0
export const copy = (obj) => Array.isArray(obj) ? obj.slice() : Object.assign({}, obj)
export const flatten = (arr) => arr.reduce((a, b) => a.concat(b), [])

export const mapFlat = (arr, fn) => flatten(arr.map(fn))

export const posAdd = (p1, p2) => { return { x: p1.x + p2.x, y: p1.y + p2.y } }
export const posSub = (p1, p2) => { return { x: p1.x - p2.x, y: p1.y - p2.y } }

export const isNull = (obj) => obj === undefined || obj === null
export const isEmpty = (arr) => arr.length === 0

export const logErr = (description, fn, ...others) => console.error(description)

export const rand = (n, m) => n + parseInt(Math.random() * m)

export const nextTick = requestAnimationFrame.bind(window)

// DO NOT use `0` as id, to prevent some strange situations:
// `const id = id || uuid()` will create a new id if the old one is `0`
// which is not what we want.
let COUNT = 0
export const uuid = () => ++COUNT

export const getRandColor = () => {
  const randNum = () => rand(100, 150)
  return `rgb(${randNum()}, ${randNum()}, ${randNum()})`
}

export const splitTactic = (arr) => {
  const rightNum = Math.ceil(arr.length / 2)
  const right = arr.slice(0, rightNum)
  const left = arr.slice(rightNum)
  return [right, left]
}


export const getMaxPoint = (...points) => {
  if (points.length === 0) { logErr('Arguments are empty', getMaxPoint) }
  else {
    const ds = points.map((p) => p.x * p.x + p.y * p.y)
    let maxIndex = 0
    let max = ds[0]
    ds.forEach((d, i) => {
      if (d > max) {
        max = d
        maxIndex = i
      }
    })

    return points[maxIndex]
  }
}

const RADIAN_MAP = {
  [DOWN]: 1 / 2 * Math.PI,
  [UP]: 3 / 2 * Math.PI,
  [RIGHT]: 0,
  [LEFT]: Math.PI,
  [RIGHT_DOWN]: 1 / 3 * Math.PI,
  [LEFT_DOWN]: 2 / 3 * Math.PI,
  [LEFT_UP]: 4 / 3 * Math.PI,
  [RIGHT_UP]: 5 / 3 * Math.PI,
}

export const getRatio = (dir) => {
  const radian = RADIAN_MAP[dir]
  return {
    x: Math.cos(radian),
    y: Math.sin(radian),
  }
}

export const _getDeltaV = (ratio, delta) => {
  const one = ratio.y > 0 ? 1 : -1
  const dy = one * delta
  const dx = dy / ratio.y * ratio.x
  return { x: dx, y: dy }
}

export const _getDeltaH = (ratio, delta) => {
  const one = ratio.x > 0 ? 1 : -1
  const dx = one * delta
  const dy = dx / ratio.x * ratio.y
  return { x: dx, y: dy }
}

export const getCornerPoint = (tok) => {
  const x1 = tok.pos.x
  const y1 = tok.pos.y
  const x2 = x1 + tok.size.width
  const y2 = y1 + tok.size.height
  return { x1, x2, y1, y2 }
}

export const getPointsConrner = (pots) => {
  const cornerPoint = { x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity }
  pots.forEach((p) => {
    cornerPoint.x1 = Math.min(cornerPoint.x1, p.x)
    cornerPoint.y1 = Math.min(cornerPoint.y1, p.y)
    cornerPoint.x2 = Math.max(cornerPoint.x2, p.x)
    cornerPoint.y2 = Math.max(cornerPoint.y2, p.y)
  })

  return cornerPoint
}

export const getTextSize = (() => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const getFontRatio = (fontSize) => {
    const MINI_SIZE = 12
    if (fontSize <= MINI_SIZE) { return [fontSize, 1] }
    else { return [MINI_SIZE, fontSize/MINI_SIZE] }
  }

  return (content, { fontStyle, fontWeight, fontSize, fontFamily }) => {
    const [fontSize1, ratio] = getFontRatio(fontSize)
    const fontSizePx = fontSize1 + 'px'
    const fontArr = [fontStyle, fontWeight, fontSizePx, fontFamily]

    // set ctx attributes before measureText
    ctx.font = fontArr.filter(item => item).join(' ')
    const lines = content.split('\n')
    const widthArr = lines.map((line) => ctx.measureText(line).width)

    const width = Math.ceil(Math.max(...widthArr) * ratio)
    const height = Math.ceil(lines.length * fontSize)

    return { width, height }
  }
})()
