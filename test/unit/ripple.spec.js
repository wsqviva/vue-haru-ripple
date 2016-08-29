/**
 * Created by wusiquan on 16/8/29.
 */

import Vue from 'vue';
import Ripple from '../../src/ripple.vue';


describe('Ripple', () => {
  it('can accept color prop', () => {
    const vm = new Vue({
      template: '<div><vue-haru-ripple color="red" v-ref:ripple></vue-haru-ripple></div>',
      components: { 'vue-haru-ripple': Ripple },
      data: {
        color: 'red'
      }
    }).$mount();

    expect(vm.color).to.equal('red');
  });

});