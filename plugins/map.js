import 'vue-googlemaps/dist/vue-googlemaps.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/src/components/cluster' // replace src with dist if you have Babel issues

import Vue from 'vue'
Vue.use(VueGoogleMaps, {
  load: {
    // your Google API key --- dev@thirstcreative.com.au
    // key: 'AIzaSyDK23sIW_372RCwBK2g4QbHHGnMwmc8C7k',
    key: 'AIzaSyB7gaqdxL076dV6V7LC7WomhFEhb2fsTPM',
  },
})

Vue.component('GmapCluster', GmapCluster)
