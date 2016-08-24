<template>
  <div class="wave" :style="waveStyle" transition="fade">
  </div>
</template>

<script>
let max = Math.max;
let ceil = Math.ceil;

const INITIAL_SCALE = 0.0001;
const INITIAL_OPACITY = 0.3;
const FINAL_SCALE = 1;
const FINAL_OPACITY = 0;

export default {

  props: ['ripple', 'index'],

  transitions: {
    'fade': {
      enter: function(el) {
        this.$nextTick(() => {
          this.waveStyle.transform = this.translateString + ' scale(1, 1)';
        });
      },

      afterEnter: function() {
        this.waveStyle.opacity = 0;
        this.$emit('after-enter', this.index);
      }
    }
  },

  data() {
    let metrics = this.ripple.metrics;
    let boundingRect = metrics.boundingRect;
    let rippleX = this.ripple.x - boundingRect.left;
    let rippleY = this.ripple.y - boundingRect.top;
    
    // max diameter
    let size = Math.sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2 + 2;
    this.translateString = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`;

    return {
      waveStyle: {
        opacity: INITIAL_OPACITY,
        backgroundColor: 'green',
        width: size + 'px',
        height: size + 'px',
        transform: `${this.translateString} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`
      }
    };
  }
};
</script>

<style lang="stylus">
.fade-transition
  transition: transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1) 
</style>

