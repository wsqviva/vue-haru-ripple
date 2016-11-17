<template>
  <div class="haru-ripple">
    <div ref="content">
      <slot></slot>
    </div>
    <transition name="spread" type="transition"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled">
      <div v-show="showWave" class="wave" :style="waveStyle" ref="ripple"></div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  const { bind: utilBind } = Vue.util

  const sqrt = Math.sqrt
  const round = Math.round

  const SUPPORT_TOUCH = 'ontouchstart' in window

  // ripple init scale
  const INITIAL_SCALE = 0.1
  // ripple final scale
  const FINAL_SCALE = ''

  // used to handle downActions triggered within one animation frame time
  const FRAME_CHECK_COUNT = 1

  export default {
    name: 'vue-haru-ripple',

    mounted() {
      this._boundDownAction = utilBind(this.downAction, this)
      this._boundUpAction = utilBind(this.upAction, this)

      if (SUPPORT_TOUCH) {
        this.$el.addEventListener('touchstart', this._boundDownAction)
        this.$el.addEventListener('touchend', this._boundUpAction)
        this.$el.addEventListener('touchcancel', this._boundUpAction)
      } else {
        this.$el.addEventListener('mousedown', this._boundDownAction)
        this.$el.addEventListener('mouseup', this._boundUpAction)
      }

      this._frameCount = 0
      // fixed rect
      let boundingRect = this._boundingRect = this.$el.getBoundingClientRect()

      this._rippleSize = round(sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2) + 2

      // have not pass color prop
      if (!this.color) {
        let color = this.$refs.content.firstElementChild && window.getComputedStyle(this.$refs.content.firstElementChild).color
        this.color = color || '#fff'
      }

      this._shouldFade = false
      this._couldVanish = false
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
          opacity: '',
          width: '',
          height: '',
          transform: ''
        }
      }
    },

    methods: {
      fadeVanish() {
        if (this._shouldFade) {
          this.$refs.ripple.style.opacity = 0
        }

        if (this._couldVaniash) {
          this.showWave = false
          this.$emit('vanish') 
        }

        this._shouldFade = !this._shouldFade
        this._couldVanish = !this._couldVaniash
      },

      beforeEnter(el) {
        // prev ripple should vanish immediately
        el.classList.remove('animating')
        el.style.opacity = this.opacity
        el.style.transform = `${this._rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`
      },

      // after the next two frames `spread-enter` class will be removed
      enter(el) {
        window.requestAnimationFrame(() => {
          el.classList.add('animating')
          el.style.transform = `${this._rippleTranslate}`
        })
      },

      // leave, afterLeave hooks not bound
      afterEnter(el) {
        console.timeEnd('abc')
        // 如果还没有up过就不能设为false
        el.classList.remove('animating')
        this.fadeVanish()
      },

      enterCancelled(el) {
        el.style.transform = `${this._rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`
      },

      frameCountCheck() {
        if (this._frameCount > 0) {
          return false
        }
        this._frameCount = FRAME_CHECK_COUNT
        return true
      },

      animFrameHandler() {
        this._frameCount--
        this.showWave = true
      },

      // mouseup event in task queue trigger before raf animation frames
      upAction(event) {
        this.fadeVanish()
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
        console.time('abc')
        if (!this.frameCountCheck()) {
          return
        }

        if (this.handleMouseDown(event) === false) {
          return
        }

        const boundingRect = this._boundingRect

        // decide 'mousedown' or 'touchstart' x, y
        const downX = event.touches ? event.touches[0].pageX : event.clientX
        const downY = event.touches ? event.touches[0].pageY : event.clientY

        let rippleX = round(downX - boundingRect.left)
        let rippleY = round(downY - boundingRect.top)

        // ripple max diameter
        let rippleTranslate = this._rippleTranslate = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`
        let rippleSize = this._rippleSize

        this.showWave = false
        
        // this.waveStyle.opacity = this.opacity
        this.waveStyle.backgroundColor = this.color
        this.waveStyle.width = `${rippleSize}px`
        this.waveStyle.height = `${rippleSize}px`
        // this.waveStyle.transform = `${rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`

        Vue.nextTick(() => {
          this.animFrameHandler()
        })
      }
    }
  }
</script>

<style lang="stylus">
  .haru-ripple
    position: relative
    overflow: hidden

    .wave
      pointer-events: none
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 50%

    .animating.spread-enter-active
      transition: transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1)
</style>
