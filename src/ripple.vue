<template>
  <div class="haru-ripple">
    <div v-el:content>
      <slot></slot>
    </div>
    <div v-show="showWave" class="wave" :class="waveClass" :style="waveStyle" transition="spread"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Raf from 'better-raf';
  let raf = Raf();
  let vueUtil = Vue.util;
  let sqrt = Math.sqrt;
  let round = Math.round;
  const INITIAL_SCALE = 0.001;
  const FINAL_SCALE = 1;
  // used to handle downActions triggered within one animation frame time
  const FRAME_CHECK_COUNT = 1;
  export default {
    name: 'vue-haru-ripple',

    ready() {
      vueUtil.on(this.$el, 'mousedown', vueUtil.bind(this.downAction, this), false);
      vueUtil.on(this.$el, 'touchstart', vueUtil.bind(this.downAction, this), false);
      vueUtil.on(this.$el, 'mouseup', vueUtil.bind(this.upAction, this), false);
      vueUtil.on(this.$el, 'mouseleave', vueUtil.bind(this.upAction, this), false);
      vueUtil.on(this.$el, 'blur', vueUtil.bind(this.upAction, this), false);
      vueUtil.on(this.$el, 'touchend', vueUtil.bind(this.upAction, this), false);

      this._frameCount = 0;
      let boundingRect = this._boundingRect = this.$el.getBoundingClientRect();
      this._rippleSize = round(sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2) + 2;

      // not pass color prop
      if (!this.color) {
        let color = this.$els.content.firstElementChild && window.getComputedStyle(this.$els.content.firstElementChild).color;
        this.color = color || '#fff';
      }
    },

    transitions: {
      spread: {
        beforeEnter() {
          this.waveClass.animating = true;
        },

        enter() {
          this.$nextTick(() => {
            this.setWaveStyle();
          });
        },

        afterEnter() {
          // leave, afterLeave hooks not bound
          this.showWave = false;
          this.$emit('disappear');
        }
      }
    },

    props: {
      // initial opacity
      opacity: {
        type: Number | String,
        default: 0.3
      },
      // support rgba?
      color: {
        type: String
      }
    },

    data: function () {
      return {
        showWave: false,

        waveClass: {
          animating: false
        },

        waveStyle: {
          backgroundColor: '',
          opacity: '',
          width: '',
          height: '',
          transform: ''
        }
      };
    },

    methods: {
      setWaveStyle() {
        this.waveStyle.transform = `${this._rippleTranslate} scale(${FINAL_SCALE}, ${FINAL_SCALE})`;
      },

      frameCountCheck() {
        if (this._frameCount > 0) {
          return false;
        }
        this._frameCount = FRAME_CHECK_COUNT;
        return true;
      },

      animFrameHandler() {
        this._frameCount--;
        this.showWave = true;
      },

      upAction(event) {
        if (event.type === 'touchend' || event.type === 'touchcancel') {
          event.preventDefault();
        }
        this.waveStyle.opacity = 0;
      },

      downAction(event) {
        if (!this.frameCountCheck()) {
          return;
        }

        if (event.type === 'mousedown') {
          // only left mouse button
          if (event.button !== 0) {
            return;
          }
        }

        let boundingRect = this._boundingRect;

        // mousedown or touchstart x, y
        let downX = event.touches ? event.touches[0].pageX : event.clientX;
        let downY = event.touches ? event.touches[0].pageY : event.clientY;

        let rippleX = round(downX - boundingRect.left);
        let rippleY = round(downY - boundingRect.top);

        // ripple max diameter
        let rippleTranslate = this._rippleTranslate = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`;
        let rippleSize = this._rippleSize;

        this.showWave = false;
        // prev ripple vanish immediately, so need class 'animating'
        this.waveClass.animating = false;

        this.waveStyle = {
          opacity: this.opacity,
          backgroundColor: this.color,
          width: `${rippleSize}px`,
          height: `${rippleSize}px`,
          transform: `${rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`
        };

        raf.requestAnimationFrame(() => {
          this.animFrameHandler();
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
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

    .animating.spread-transition
      transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1)
</style>
