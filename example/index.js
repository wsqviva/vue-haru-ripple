import Vue from 'vue';
import ripple from '../src/ripple';

let vm = new Vue({
  el: 'body',
  components: { 
    'vue-haru-ripple': ripple 
  }
});