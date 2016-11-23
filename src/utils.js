import Vue from 'vue'
const { inBrowser, isIE9 } = Vue.util

// vue itself only support IE9=+
const hasTransition = inBrowser && !isIE9

let transitionEndEvent = 'transitionend'
if (hasTransition) {
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionEndEvent = 'webkitTransitionEnd'
  }
}

export { transitionEndEvent }

export const sqrt = Math.sqrt
export const ceil = Math.ceil
export const max  = Math.max


export function onceTransitionEnds(el, proptyName, transitionEndEvent, timeout, cb) {
  let timer

  const dispose = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    off(el, transitionEndEvent, onEnd)
  }

  const end = () => {
    dispose()
    cb()
  }

  const onEnd = e => {
    if (e.target === el && e.propertyName === proptyName) {
      end()
    }
  }

  on(el, transitionEndEvent, onEnd)

  setTimeout(() => {
    end()
  }, timeout + 1)

  return dispose
}

export function addClass(el, cls) {
  el.classList.add(cls)
}

export function removeClass(el, cls) {
  el.classList.remove(cls)
}

export function on(el, eventName, fn) {
  el.addEventListener(eventName, fn, false)
}

export function off(el, eventName, fn) {
  el.removeEventListener(eventName, fn, false)
}


export function calcBoundingRect(el) {
  return el.getBoundingClientRect()
}

function distance(x1, y1, x2, y2) {
  var xDelta = (x1 - x2);
  var yDelta = (y1 - y2);

  return sqrt(xDelta * xDelta + yDelta * yDelta);
}

export function furthestCornerDistanceFrom(x, y, width, height) {
  var topLeft = distance(x, y, 0, 0)
  var topRight = distance(x, y, width, 0)
  var bottomLeft = distance(x, y, 0, height)
  var bottomRight = distance(x, y, width, height)

  return max(topLeft, topRight, bottomLeft, bottomRight)
}

