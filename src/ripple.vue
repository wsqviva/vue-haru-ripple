<template>
  <div class="haru-ripple">
    <div ref="content">
      <slot></slot>
    </div>
    <transition name="spread"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @after-leave="afterLeave">
      <div v-show="showWave" class="wave" :style="waveStyle" ref="ripple"></div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { SUPPORT_TOUCH, INITIAL_SCALE, FINAL_SCALE, TRANSFORM_DURATION, RIPPLE_STATE_INIT, RIPPLE_STATE_READY_TO_VANISH, RIPPLE_STATE_VANISH } from './constants'
  import { transitionEndEvent, onceTransitionEnds, sqrt, ceil, furthestCornerDistanceFrom, addClass, removeClass } from './utils'

  const { bind: utilBind } = Vue.util

  export default {
    name: 'vue-haru-ripple',

    mounted() {
      this._boundDownAction = utilBind(this.downAction, this)
      this._boundUpAction = utilBind(this.upAction, this)

      // pointerdown, pointerup
      // focus, blur
      if (SUPPORT_TOUCH) {
        this.$el.addEventListener('touchstart', this._boundDownAction)
        this.$el.addEventListener('touchend', this._boundUpAction)
        this.$el.addEventListener('touchcancel', this._boundUpAction)
      } else {
        this.$el.addEventListener('mousedown', this._boundDownAction)
        this.$el.addEventListener('mouseup', this._boundUpAction)
      }

      // el'rect
      let boundingRect = this._boundingRect = this.$el.getBoundingClientRect()

      // have not pass color prop
      if (!this.color) {
        let color = this.$refs.content.firstElementChild && window.getComputedStyle(this.$refs.content.firstElementChild).color
        this.color = color || '#fff'
      }

      this.waveStyle.backgroundColor = this.color
    },

    props: {
      // ripple initial opacity
      opacity: {
        type: Number | String,
        default: 0.3
      },
      // ripple color, default is its color
      // TODO: support rgba
      color: {
        type: String
      }
    },

    data() {
      return {
        showWave: false,

        waveStyle: {
          backgroundColor: '',
          opacity: this.opacity,
          width: '',
          height: '',
          marginLeft: '',
          marginTop: '',
          transform: ''
        }
      }
    },

    methods: {
      _forwardState(el, hook) {
        const rippleState = {
          [RIPPLE_STATE_INIT]: RIPPLE_STATE_READY_TO_VANISH,
          [RIPPLE_STATE_READY_TO_VANISH]: RIPPLE_STATE_VANISH,
          [RIPPLE_STATE_VANISH]: RIPPLE_STATE_INIT
        }

        const currentRippleState = el.dataset.ripplestate

        if (currentRippleState == RIPPLE_STATE_READY_TO_VANISH) {
          this.showWave = false
          hook && hook()
        }

        el.dataset.ripplestate = rippleState[currentRippleState]
      },

      // prev ripple should vanish immediately
      // optimisticly remove
      beforeEnter(el) {
        removeClass(el, 'animating')
        Object.assign(el.style, { opacity: this.opacity, transform: `${this._rippleTranslate}${INITIAL_SCALE}` })
      },

      // after the subsequent two frames `spread-enter` class will be removed
      enter(el, done) {
        window.requestAnimationFrame(() => {
          addClass(el, 'animating')
          Object.assign(el.style, { transform: `${this._rippleTranslate}` })
          this._disposeTransHandler = onceTransitionEnds(el, 'transform', transitionEndEvent, TRANSFORM_DURATION, done)
        })
      },

      afterEnter(el) {
        removeClass(el, 'animating')

        this._forwardState(el)
      },

      afterLeave(el) {
        if (this._upaction) {
          removeClass(el, 'vanish')
        }
      },

      enterCancelled(el) {
        el.style.setProperty('transform', `${this._rippleTranslate}${INITIAL_SCALE})`)
      },

      animFrameHandler() {
        this.showWave = true
      },

      // mouseup event in task queue `should` trigger before raf animation frames
      upAction(event) {
        let ripple = this.$refs.ripple

        ripple.style.opacity = 0

        this._upaction = false
        this._forwardState(ripple, () => {
          this._upaction = true
          addClass(ripple, 'vanish')
        })

        this.handleMouseUp(event)
      },

      handleMouseUp(event) {
        if (event.type.indexOf('mouse') === 0) {
          this.$el.removeEventListener('mouseleave', this._boundUpAction)
        }
      },

      handleMouseDown(event) {
        if (event.type === 'mousedown') {
          // only left mouse button
          if (event.button !== 0) {
            return false
          }
          this.$el.addEventListener('mouseleave', this._boundUpAction)
        }
      },
      
      downAction(event) {
        if (this.handleMouseDown(event) === false) {
          return
        }

        this._disposeTransHandler && this._disposeTransHandler()

        const boundingRect = this._boundingRect

        // identify 'mousedown' or 'touchstart' x, y
        const downX = event.touches ? event.touches[0].pageX : event.clientX
        const downY = event.touches ? event.touches[0].pageY : event.clientY

        let rippleX = ceil(downX - boundingRect.left)
        let rippleY = ceil(downY - boundingRect.top)

        let rippleTranslate = this._rippleTranslate = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`
        // ripple diameter
        let rippleSize = ceil(2.05 * furthestCornerDistanceFrom(rippleX, rippleY, boundingRect.width, boundingRect.height))

        this.showWave = false

        this.waveStyle.width = `${rippleSize}px`
        this.waveStyle.height = `${rippleSize}px`

        this.$refs.ripple.dataset.ripplestate = RIPPLE_STATE_INIT

        Vue.nextTick(() => {
          this.animFrameHandler()
        })
      }
    },

    beforeDestroy() {
      console.log('beforeDestroy')
    }
  }
</script>

<style lang="stylus">
  .haru-ripple
    position: relative
    overflow: hidden

    // wave default style
    .wave
      pointer-events: none
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 50%
    
    // cubic-bezier(0, 0, 0.2, 1)
    .animating.spread-enter-active
      transition: transform .8s cubic-bezier(.157, .72, .386, .987), opacity .6s linear

    .vanish.spread-leave-active
      transition: opacity 0.4s linear
</style>
