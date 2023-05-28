<template>
  <TcRatio :height="ratio.height" :width="ratio.width" class="relative">
    <div class="inset-0 absolute w-full">
      <GmapMap
        class="w-full h-full"
        :center="center"
        :zoom="zoom"
        :options="mapOptions"
        @zoom_changed="(z) => (zoom = z)"
        @bounds_changed="updateBounds"
        @idle="onIdle"
      >
        <GmapMarker
          ref="markers"
          :title="coordinate.name"
          :icon="{
            url: require('@/assets/svg/marker.svg?data'),
            fillColor: '#fff',
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 1,
          }"
          :position="coordinate._geoloc"
        ></GmapMarker>
      </GmapMap>
    </div>
  </TcRatio>
</template>

<script>
import { debounce } from 'lodash-es'
import mapStyles from '@/models/mapStyles'

export default {
  props: {
    coordinate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toggleValue: false,
      clusters: {},
      zoom: 6,
      mapBounds: {},
      mapOptions: {
        styles: mapStyles,
      },
      currentLocation: {
        lat: null,
        lng: null,
      },
      center: {
        lat: -37.246870250479994,
        lng: 144.92503799796066,
      },
      selected: false,

      currentMidx: null,
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: '',
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      width: 1,
      height: 0,
    }
  },
  computed: {
    ratio() {
      if (this.width > this.height) {
        return {
          height: 312,
          width: 672,
        }
      } else {
        return {
          height: 312,
          width: 375,
        }
      }
    },
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.center = this.coordinate._geoloc
    this.selected = true
    this.zoom = 15
    // this.highlight(this.coordinate, true)
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(e) {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    updateBounds: debounce(function (bounds) {
      if (!bounds) return
      // eslint-disable-next-line no-unused-vars,no-unused-vars
      const ne = bounds.getNorthEast()

      // eslint-disable-next-line no-unused-vars
      const sw = bounds.getSouthWest()
      this.mapBounds = bounds
    }, 500),
    onIdle(map) {
      return
      // eslint-disable-next-line no-unreachable
      this.mapBounds = this.updateBounds(map.getBounds())
    },
  },
}
</script>
