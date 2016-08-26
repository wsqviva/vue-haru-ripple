import Vue from 'vue';
import ripple from '../src/ripple';

new Vue({
  el: 'body',
  components: { 
    'vue-haru-ripple': ripple 
  }
});