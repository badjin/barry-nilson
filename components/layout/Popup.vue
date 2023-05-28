<template>
  <div
    class="popup overflow-y-auto overflow-x-hidden w-full items-start h-full md:justify-center md:items-center md:flex"
    :class="{
      visible: showPopup,
    }"
  >
    <div class="relative w-full md:w-860px max-w-6xl">
      <div class="popup-content bg-white">
        <div class="form-container py-10 px-6 md:px-12">
          <iframe :src="formUrl" height="100%" width="100%" frameborder="0" />
        </div>
        <div class="form-close" @click="togglePopup()">
          <div class="h-4 w-4">
            <Close class="fill-current text-steelblue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import get from 'lodash-es/get'
export default {
  components: {
    Close: () => import('~/assets/svg/close.svg?inline'),
  },
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    popupModule() {
      return get(this.module, 'newsletter[0]') || {}
    },
    formUrl() {
      const popup = get(this.popupModule, 'popupWindow[0]') || ''
      return (
        popup.formUrl ||
        'https://communications.bnlaw.com.au/6/7/landing-pages/subscribe---website---new.asp'
      )
    },
    formUrlMobile() {
      return 'https://communications.bnlaw.com.au/6/7/landing-pages/subscribe.asp'
    },
    popupId() {
      return 'popup-newsletter'
    },
    showPopup() {
      return this.$store.state.globals.cache[this.popupId]
    },
  },
  methods: {
    togglePopup() {
      // console.log(this.popupId)
      this.$store.commit('globals/cache', {
        key: this.popupId,
        value: !this.showPopup,
      })
    },
  },
}
</script>
<style scoped>
.popup {
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  background: rgba(0, 62, 83, 0.4);
  transition: opacity 350ms ease-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popup.visible {
  pointer-events: auto;
  opacity: 1;
}

@media screen and (max-height: 768px) {
  .popup {
    align-items: flex-start;
  }
}

.popup-content {
  box-shadow: 0 4px 94px rgba(0, 0, 0, 0.25);
}

.form-container {
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
}

.form-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

@screen md {
  .form-container {
    height: 56rem;
    max-height: 56rem;
    overflow-y: auto;
  }
  .form-close {
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
  }
}
</style>
