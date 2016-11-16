import Vue from 'vue';
import ripple from '../src/ripple';

new Vue({
  el: '#iloveyou',

  components: {
    'vue-haru-ripple': ripple
  },

  render(h) {
    return (
      <div class="card">
        <vue-haru-ripple class={{ripple: true}} color={this.randomColor} opacity="0.3">
          <div class="text">
            <span>真三国无双v3.9d 诸葛神装</span>
          </div>
        </vue-haru-ripple>
      </div>
    )
  },

  data: {
    randomColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }
});