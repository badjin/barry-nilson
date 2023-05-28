<template>
  <div id="content" class="tc-container">
    <div class="border-b border-opacity-30 border-steelblue py-c">
      <div class="flex flex-wrap -mx-10">
        <div class="px-10 button-module space-y-5 lg:space-y-10">
          <span
            class="text-xs tracking-loose text-primary uppercase inline-block"
          >
            Please select:
          </span>
          <div class="space-y-5 lg:space-y-10">
            <div v-for="item in formButtons" :key="item.value">
              <ButtonArrow
                :class="formType === item.value && 'text-primary'"
                @click="setFormType(item.value)"
              >
                {{ item.label }}
              </ButtonArrow>
            </div>
          </div>
        </div>
        <div class="px-10 w-full mt-10 lg:mt-0 lg:w-1/2">
          <h2 class="tc-h2">{{ module.heading }}</h2>
          <span class="mt-6 inline-block tc-small">
            "*" indicates required fields
          </span>
          <div v-show="success" class="bg-primary text-white mt-6 px-5 py-3">
            <span>{{ module.successMessage }}</span>
          </div>
          <div class="pt-c">
            <ContactFormFamily v-show="formType === 1" />
            <ContactFormInsurance v-show="formType === 2" />
            <ContactFormGeneral v-show="formType === 3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      defaultEmail: 'enquiries@bnlaw.com.au',
      success: false,
      formButtons: [
        { value: 1, label: 'Family, Wills & Estates' },
        { value: 2, label: 'Insurance & Health' },
        { value: 3, label: 'General' },
      ],
      formType: 1,
    }
  },
  computed: {
    email() {
      return this.module.contactEmail || this.defaultEmail
    },
  },
  mounted() {
    this.success = this.$route.query.success || false
    this.formType = this.$route.query.form ? Number(this.$route.query.form) : 1
    this.success && this.scrollToAnchor()
    this.$route.hash === '#content' && this.scrollToAnchor()
  },
  methods: {
    setFormType(value) {
      this.formType = value
      this.success = false
    },
    scrollToAnchor() {
      const element = document.getElementById('content')
      if (element) {
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          (this.winSize > 768 ? 98 : 50)
        window.scrollTo({ top: y, behavior: 'smooth' })
        // dataLayer 객체에 페이지 정보 추가
        window.dataLayer.push({
          event: 'successful_form_submission',
          formCategory: this.formButtons[this.formType - 1].label,
        })
      }
    },
  },
}
</script>
<style>
.button-module {
  @apply w-full;
}

@screen lg {
  .button-module {
    @apply w-1/2 border-r border-opacity-30 border-steelblue;
  }
}
.form-field {
  @apply relative pb-10;
}
</style>
