new Vue({
  el: 'body',
  components: { 
    'vue-haru-ripple': VueHaruRipple 
  },
  data: {
    randomColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }
});