import values from 'lodash-es/values'
export default {
  components: {
    ErrorMessage: () => import('@/components/form/ErrorMessage.vue'),
    TextInput: () => import('~/components/form/TextInput.vue'),
    TextArea: () => import('~/components/form/TextArea.vue'),
  },
  data() {
    return {
      showErrors: false,
      nameFocused: false,
      emailFocused: false,
      phoneFocused: false,
      messageFocused: false,
      name: '',
      email: '',
      phone: '',
      location: '',
      message: '',
      findUsOption: '',
      contactOption: '',
      locations: [
        { value: 'brisbane', label: 'Brisbane' },
        { value: 'adelaide', label: 'Adelaide' },
        { value: 'sydney', label: 'Sydney' },
        { value: 'perth', label: 'Perth' },
        { value: 'melbourne', label: 'Melbourne' },
        { value: 'hobart', label: 'Hobart' },
        { value: 'outside', label: 'Outside of Australia' },
      ],
      findUsOptions: [
        { value: 'online', label: 'Online Search' },
        { value: 'socialMedia', label: 'Social Media' },
        { value: 'google', label: 'Google Ad' },
        { value: 'newsletter', label: 'Email Newsletter' },
        { value: 'article', label: 'Article or Insight' },
        { value: 'guide', label: "Doyle's Guide" },
        { value: 'brochure', label: 'Flyer or Brochure' },
        {
          value: 'colleague',
          label: 'Referred by a colleague, friend or family members',
        },
        {
          value: 'professionalConsultant',
          label: 'Referred by a professional consultant',
        },
        {
          value: 'BNclient',
          label: 'Referred by a past or existing BN client',
        },
        {
          value: 'BNteamMembers',
          label: 'Referred by a BN team members',
        },
        { value: 'other', label: 'Other' },
      ],
      contactOptions: [
        { value: 'phone', label: 'Phone' },
        { value: 'email', label: 'Email' },
      ],
      reCaptcha: false,
    }
  },
  computed: {
    isValidEmail() {
      // dont validate if empty
      if (!this.email) return false
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(this.email).toLowerCase())
    },
    hasErrors() {
      return values(this.errors)
        .reduce((acc, e) => {
          acc = [...acc, ...e]
          return acc
        }, [])
        .some((e) => e.test)
    },
  },
  methods: {
    submit(e) {
      // try {
      //   await this.$recaptcha.getResponse()
      //   // console.log('ReCaptcha token:', token)

      //   this.reCaptcha = false
      //   this.showErrors = false
      //   // e.target.submit()
      // } catch (error) {
      //   e && e.preventDefault()
      //   this.showErrors = true
      //   this.reCaptcha = true
      // }

      if (this.hasErrors) {
        e && e.preventDefault()
        this.showErrors = true
      }

      // await this.$recaptcha.reset()
    },
    getErrorMessage(value) {
      const message = this.errors[value].find((e) => e.test)
      return message?.message
    },
  },
}
