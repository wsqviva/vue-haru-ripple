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
import rippleWave from './rippleWave'

let vueUtil = Vue.util;
let max = Math.max;
let sqrt = Math.sqrt;
let ceil = Math.ceil;

function ElementMetrics(element) {
  var boundingRect = this.boundingRect = element.getBoundingClientRect();

  this.element = element;
}

ElementMetrics.prototype = {
  distance: function(x1, y1, x2, y2) {
    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
};

export default {
  name: 'vue-haru-ripple',

  components: { rippleWave },

  ready() {
    vueUtil.on(this.$el, 'mousedown', vueUtil.bind(this.downAction, this), false);
    
    this.metrics = new ElementMetrics(this.$el);
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
    downAction(event) {
      let self = this;
      // ripple related params
      let ripple = {
        x: event.clientX,
        y: event.clientY,
        metrics: this.metrics
      };

      this.waveBgStyle = {
        backgroundColor: this.color,
        opacity: this.initialOpacity
      };
      
      this.ripples.push(ripple);
    },

    vanish(index) {
      let list = this.ripples;
      let i;
      let k;
      let len = list.length;
      for (i = index, k = i + 1; k < len; i += 1, k += 1) {
        list[i] = list[k];
      }
      list.pop();

      if (!list.length) {
        this.waveBgStyle = {
          backgroundColor: '',
          opacity: ''
        };
      }
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