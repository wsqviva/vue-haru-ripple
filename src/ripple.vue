<template>
  <div class="haru-ripple">
    <slot></slot>

    <div class="wave" :class="waveClass" :style="waveStyle"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Raf from 'better-raf';

  let raf = Raf();
  let vueUtil = Vue.util;
  let sqrt = Math.sqrt;

  const INITIAL_SCALE = 0.001;
  const FINAL_SCALE = 1;

  // used to handle downActions triggered within one animation frame time
  const FRAME_CHECK_COUNT = 1;

  export default {
    name: 'vue-haru-ripple',

    ready() {
      // TODO: add touchstart touchend touchcancel
      vueUtil.on(this.$el, 'mousedown', vueUtil.bind(this.downAction, this), false);
      vueUtil.on(this.$el, 'mouseup', vueUtil.bind(this.upAction, this), false);

      this._frameCount = 0;
      let boundingRect = this._boundingRect = this.$el.getBoundingClientRect();
      this._rippleSize = sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2 + 2;
    },

    props: {
      initialOpacity: {
        type: Number,
        default: 0.3
      },

      // support rgba?
      color: {
        type: String,
        default: '#fff'
      }
    },

    data: function () {
      return {
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
        if (this._frameCount-- > 0) {
          this.waveClass.animating = true;
          this.$nextTick(() => {
            this.setWaveStyle();
          });
        }
      },

      upAction() {
        this.waveStyle.opacity = 0;
        this.$emit('disappear');
      },

      downAction(event) {
        if(this.frameCountCheck()) {
          let boundingRect = this._boundingRect;

          // mousedown or touchstart x, y
          let downX = event.clientX;
          let downY = event.clientY;

          let rippleX = downX - boundingRect.left;
          let rippleY = downY - boundingRect.top;

          // ripple max diameter
          let rippleTranslate = this._rippleTranslate = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`;
          let rippleSize = this._rippleSize;


          this.waveClass.animating = false;

          this.waveStyle = {
            opacity: INITIAL_OPACITY,
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

  .animating
    transition: transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1)
</style>