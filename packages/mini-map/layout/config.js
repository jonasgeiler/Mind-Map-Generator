import {
  RIGHT, LEFT, DOWN, UP,
  LEFT_DOWN, LEFT_UP, RIGHT_UP, RIGHT_DOWN,
  RIGHT_INTER, LEFT_INTER, DOWN_INTER,

  ANGLE_VERT, ANGLE_HORI,

  MAP, LOGIC_R, LOGIC_L, ORG, ORG_UP,
  TREE_L, TREE_R, TIME_V, TIME_UP, TIME_DOWN, TIME_H_UP, TIME_H_DOWN, TIME_H,
  FISH_RIGHT_UP_IN, FISH_RIGHT_DOWN_IN, FISH_LEFT_UP_IN, FISH_LEFT_DOWN_IN,
  FISH_RIGHT_UP, FISH_RIGHT_DOWN, FISH_LEFT_UP, FISH_LEFT_DOWN,
  FISH_RIGHT, FISH_LEFT,
} from '../constant'

export const STRUCT_MAP = {
  [MAP]: {
    OUTS: [RIGHT, LEFT],
    LineStyle: ANGLE_VERT,
  },
  [LOGIC_R]: {
    IN: LEFT,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: DOWN,
    LineStyle: ANGLE_VERT,
  },
  [LOGIC_L]: {
    IN: RIGHT,
    OUTS: [LEFT],
    GroupIN: RIGHT,
    GroupDIR: DOWN,
    LineStyle: ANGLE_VERT,
  },
  [ORG]: {
    IN: UP,
    OUTS: [DOWN],
    GroupIN: UP,
    GroupDIR: RIGHT,
    LineStyle: ANGLE_HORI,
  },
  [ORG_UP]: {
    IN: DOWN,
    OUTS: [UP],
    GroupIN: DOWN,
    GroupDIR: RIGHT,
    LineStyle: ANGLE_HORI,
  },
  [TREE_L]: {
    IN: RIGHT,
    OUTS: [DOWN],
    GroupIN: RIGHT_UP,
    GroupAlign: UP,
    GroupDIR: DOWN,
    LineStyle: ANGLE_VERT,
  },
  [TREE_R]: {
    IN: LEFT,
    OUTS: [DOWN],
    GroupIN: LEFT_UP,
    GroupAlign: UP,
    GroupDIR: DOWN,
    LineStyle: ANGLE_VERT,
  },
  [TIME_V]: {
    IN: UP,
    OUTS: [DOWN],
    GroupIN: UP,
    GroupAlign: UP,
    GroupDIR: DOWN_INTER,
    LineStyle: ANGLE_VERT,
  },
  [TIME_UP]: {
    IN: LEFT,
    OUTS: [UP],
    GroupIN: LEFT_DOWN,
    GroupAlign: DOWN,
    GroupDIR: DOWN,
    Child: LOGIC_R,
    LineStyle: ANGLE_VERT,
  },
  [TIME_DOWN]: {
    IN: LEFT,
    OUTS: [DOWN],
    GroupIN: LEFT_UP,
    GroupAlign: UP,
    GroupDIR: DOWN,
    Child: LOGIC_R,
    LineStyle: ANGLE_VERT,
  },
  [TIME_H_UP]: {
    IN: LEFT,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT,
    Child: TIME_UP,
  },
  [TIME_H_DOWN]: {
    IN: LEFT,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT,
    Child: TIME_DOWN,
  },
  [TIME_H]: {
    IN: LEFT,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT_INTER,
  },
  [FISH_RIGHT_UP_IN]: {
    IN: LEFT_DOWN,
    OUTS: [RIGHT_DOWN],
    GroupIN: LEFT_DOWN,
    GroupDIR: RIGHT_UP,
  },
  [FISH_RIGHT_DOWN_IN]: {
    IN: LEFT_UP,
    OUTS: [RIGHT_DOWN],
    GroupIN: LEFT_UP,
    GroupDIR: RIGHT_DOWN,
    TopicIN: LEFT_DOWN,
  },
  [FISH_LEFT_UP_IN]: {
    IN: RIGHT_DOWN,
    OUTS: [LEFT_DOWN],
    GroupIN: RIGHT_DOWN,
    GroupDIR: LEFT_UP,
  },
  [FISH_LEFT_DOWN_IN]: {
    IN: RIGHT_UP,
    OUTS: [LEFT_DOWN],
    GroupIN: RIGHT_UP,
    GroupDIR: LEFT_DOWN,
    TopicIN: RIGHT_DOWN,
  },
  [FISH_RIGHT_UP]: {
    IN: LEFT_DOWN,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT,
    Child: FISH_RIGHT_UP_IN,
  },
  [FISH_RIGHT_DOWN]: {
    IN: LEFT_UP,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT,
    Child: FISH_RIGHT_DOWN_IN,
  },
  [FISH_LEFT_UP]: {
    IN: RIGHT_DOWN,
    OUTS: [LEFT],
    GroupIN: RIGHT,
    GroupDIR: LEFT,
    Child: FISH_LEFT_UP_IN,
  },
  [FISH_LEFT_DOWN]: {
    IN: RIGHT_UP,
    OUTS: [LEFT],
    GroupIN: RIGHT,
    GroupDIR: LEFT,
    Child: FISH_LEFT_DOWN_IN,
  },
  [FISH_RIGHT]: {
    IN: LEFT,
    OUTS: [RIGHT],
    GroupIN: LEFT,
    GroupDIR: RIGHT_INTER,
  },
  [FISH_LEFT]: {
    IN: RIGHT,
    OUTS: [LEFT],
    GroupIN: RIGHT,
    GroupDIR: LEFT_INTER,
  },
}

export const ANIMATION = true
export const BRANCH_PADDING = [10, 10, 10, 10]
export const CONN_GAP = 10
export const FONT_FAMILY = 'Helvetica, Arial, sans-serif'

export const DEFAULT_STYLE = [
  {
    text: {
      content: 'Central Topic',
      fontSize: 24,
      fontFamily: FONT_FAMILY,
    },
    padding: [10, 10, 10, 10],
  },
  {
    text: {
      content: 'Main Topic',
      fontSize: 16,
      fontFamily: FONT_FAMILY,
    },
    padding: [10, 10, 10, 10],
  },
  {
    text: {
      content: 'Subtopic',
      fontSize: 12,
      fontFamily: FONT_FAMILY,
    },
    padding: [5, 5, 5, 5],
  },
]
