<template>
  <div class="haru-ripple">
    <slot></slot>
    <div class="background" :style="waveBgStyle"></div>
    <div class="waves">
      <ripple-wave v-for="ripple in ripples" :ripple="ripple" :index="$index" @after-enter="vanish">
      </ripple-wave>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import rippleWave from './rippleWave';

let vueUtil = Vue.util;
let max = Math.max;
let sqrt = Math.sqrt;
let ceil = Math.ceil;

const INITIAL_SCALE = 0.0001;

export default {
  name: 'vue-haru-ripple',

  components: { rippleWave },

  ready() {
    vueUtil.on(this.$el, 'mousedown', vueUtil.bind(this.downAction, this), false);
    vueUtil.on(this.$el, 'mouseup', vueUtil.bind(this.upAction, this), false);

    this.boundingRect = this.$el.getBoundingClientRect();
  },

  props: {
    initialOpacity: {
      type: Number,
      default: 0.3
    },

    color: {
      type: String,
      default: 'green'
    }
  },

  data: function() {
    return {
      // a list of the ripple
      ripples: [],

      waveBgStyle: {
        backgroundColor: '',
        opacity: ''
      }
    };
  },

  methods: {

    upAction(event) {

    },

    downAction(event) {
      let boundingRect = this.boundingRect;

      // mousedown or touchdown x, y
      let downX = event.clientX;
      let downY = event.clientY; 

      let rippleX = downX - this.boundingRect.left;
      let rippleY = downY - this.boundingRect.top;

      // ripple max diameter
      let rippleSize = sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2 + 2;
      let rippleTranslate = `translate(-50%, -50%) translate(${rippleX}px, ${rippleY}px)`;

      let ripple = {
        rippleSize: rippleSize,
        rippleTranslate: rippleTranslate,
        color: this.color
      };
      
      this.waveBgStyle = {
        backgroundColor: this.color,
        opacity: this.initialOpacity
      };

      this.ripples.push(ripple);
    },

    vanish(index) {
      // let list = this.ripples;
      // let i;
      // let k;
      // let len = list.length;
      // for (i = index, k = i + 1; k < len; i += 1, k += 1) {
      //   list[i] = list[k];
      // }
      // list.pop();

      // if (!list.length) {
      //   this.waveBgStyle = {
      //     backgroundColor: '',
      //     opacity: ''
      //   };
      // }
    }
  }
};
</script>

<style lang="stylus">
.haru-ripple
  position: relative
    
  .background, .waves, .wave
    pointer-events: none
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  
  .waves
    overflow: hidden
  
  .wave
    border-radius: 50% 
</style>