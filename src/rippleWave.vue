<template>
  <div class="wave" :style="waveStyle" transition="fade">
  </div>
</template>

<script>
let max = Math.max;
let ceil = Math.ceil;

const INITIAL_SCALE = 0.001;
const FINAL_SCALE = 1;
const INITIAL_OPACITY = 0.3;
const FINAL_OPACITY = 0;

export default {

  props: ['ripple', 'index'],

  transitions: {
    'fade': {
      enter: function(el) {
        this.$nextTick(() => {
          this.waveStyle.transform = `${this.rippleTranslate} scale(${FINAL_SCALE}, ${FINAL_SCALE})`;
        });
      },

      afterEnter: function() {
        this.waveStyle.opacity = 0;
        this.$emit('after-enter', this.index);
      }
    }
  },

  data() {
    let { rippleSize, rippleTranslate, color } = this.ripple;
    
    this.rippleTranslate = rippleTranslate;
    
    return {
      waveStyle: {
        opacity: INITIAL_OPACITY,
        backgroundColor: color,
        width: `${rippleSize}px`,
        height: `${rippleSize}px`,
        transform: `${rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`
      }
    };
  }
};
</script>

<style lang="stylus">
.fade-transition
  transition: transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1) 
</style>

