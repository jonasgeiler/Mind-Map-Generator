// Author: zhangxinxu
// From: https://github.com/zhangxinxu/Tween/blob/master/tween.js

const Tween = {
  Linear: function (t, b, c, d) {
    return c * t / d + b;
  },
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
}

export default Tween
