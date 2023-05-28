<template>
  <form
    class="tc-form"
    name="Contact-Family"
    action="/get-in-touch/?success=true&form=1#content"
    method="POST"
    netlify-honeypot="bot-field"
    data-netlify-recaptcha="true"
    data-netlify="true"
    @submit="submit"
  >
    <input type="hidden" name="form-name" value="Contact-Family" />
    <p class="hidden">
      <label>
        Don’t fill this out if you’re human: <input name="bot-field" />
      </label>
    </p>
    <fieldset>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="nameFocused ? '' : getErrorMessage('name')"
        />
        <TextInput
          v-model="name"
          name="name"
          :class="showErrors && getErrorMessage('name') && 'border-form'"
          @focus="nameFocused = true"
          @blur="nameFocused = false"
        />
        <FormLabel>Your full name</FormLabel>
      </div>
      <div class="grid md:grid-cols-2 gap-x-8 items-end">
        <div class="form-field required">
          <ErrorMessage
            v-show="showErrors"
            :message="emailFocused ? '' : getErrorMessage('email')"
          />
          <TextInput
            v-model="email"
            name="email"
            :class="showErrors && getErrorMessage('email') && 'border-form'"
            @focus="emailFocused = true"
            @blur="emailFocused = false"
          />
          <FormLabel>Email address</FormLabel>
        </div>
        <div class="form-field required">
          <ErrorMessage
            v-show="showErrors"
            :message="phoneFocused ? '' : getErrorMessage('phone')"
          />
          <TextInput
            v-model="phone"
            name="phone"
            :class="showErrors && getErrorMessage('phone') && 'border-form'"
            @focus="phoneFocused = true"
            @blur="phoneFocused = false"
          />
          <FormLabel>Phone number</FormLabel>
        </div>
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('location')"
        />
        <FormCustomSelect
          :error-tag="showErrors && getErrorMessage('location') ? true : false"
          option-name="Location"
          label="Your location"
          :options="locations"
          @input="(value) => (location = value)"
        />
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="partnerNameFocused ? '' : getErrorMessage('partnerName')"
        />
        <TextInput
          v-model="partnerName"
          name="partnerName"
          :class="showErrors && getErrorMessage('partnerName') && 'border-form'"
          @focus="partnerNameFocused = true"
          @blur="partnerNameFocused = false"
        />
        <FormLabel>Your partner/former partner's full name</FormLabel>
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="otherNameFocused ? '' : getErrorMessage('otherName')"
        />
        <TextInput
          v-model="otherName"
          name="otherName"
          :overflowed="true"
          :class="showErrors && getErrorMessage('otherName') && 'border-form'"
          @focus="otherNameFocused = true"
          @blur="otherNameFocused = false"
        />
        <FormLabel :overflowed="true">
          Has your partner/former partner been known by any other name?
        </FormLabel>
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('helpOption')"
        />
        <FormCustomSelect
          :error-tag="
            showErrors && getErrorMessage('helpOption') ? true : false
          "
          option-name="Issue with"
          label="How can we help you?"
          :options="helpOptions"
          @input="(value) => (helpOption = value)"
        />
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="messageFocused ? '' : getErrorMessage('message')"
        />
        <TextArea
          v-model="message"
          name="message"
          :class="showErrors && getErrorMessage('message') && 'border-form'"
          @focus="messageFocused = true"
          @blur="messageFocused = false"
        />
        <FormLabel>Details of your enquiry</FormLabel>
      </div>
      <!-- Common part -->
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('findUsOption')"
        />
        <FormCustomSelect
          :error-tag="
            showErrors && getErrorMessage('findUsOption') ? true : false
          "
          option-name="Found from"
          label="How did you find us?"
          :options="findUsOptions"
          @input="(value) => (findUsOption = value)"
        />
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('contactOption')"
        />
        <FormCustomSelect
          :error-tag="
            showErrors && getErrorMessage('contactOption') ? true : false
          "
          option-name="Contact with"
          label="How would you prefer to be contacted?"
          :options="contactOptions"
          @input="(value) => (contactOption = value)"
        />
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('timeOption')"
        />
        <FormCustomSelect
          :error-tag="
            showErrors && getErrorMessage('timeOption') ? true : false
          "
          option-name="Best time"
          label="What is the best time to contact you?"
          :options="timeOptions"
          @input="(value) => (timeOption = value)"
        />
      </div>
      <div class="form-field required">
        <ErrorMessage
          v-show="showErrors"
          :message="getErrorMessage('reCaptcha')"
        />
        <recaptcha />
      </div>
      <button
        :class="{
          'opacity-50 pointer-events-none': showErrors && hasErrors,
        }"
        type="submit"
        class="mt-8"
      >
        <ButtonPrimary>Submit</ButtonPrimary>
      </button>
    </fieldset>
  </form>
</template>

<script>
import FormMixin from '@/components/contact/FormMixin'
export default {
  mixins: [FormMixin],
  data() {
    return {
      formName: 'Family',
      otherNameFocused: false,
      partnerNameFocused: false,
      partnerName: '',
      otherName: '',
      helpOption: '',
      timeOption: '',
      helpOptions: [
        { value: 'parentingChildren', label: "Parenting & Children's Matters" },
        { value: 'propertySettlements', label: 'Property Settlements' },
        { value: 'domesticFamilyAbuse', label: 'Domestic and Family Abuse' },
        { value: 'divorceSeparation', label: 'Divorce & Separation' },
        { value: 'willsEstates', label: 'Wills & Estates' },
        { value: 'financialAgreements', label: 'Financial Agreements' },
        {
          value: 'deFactoSameSexRelationships',
          label: 'De Facto and Same Sex Relationships',
        },
        {
          value: 'disputeResolutionOptions',
          label: 'Dispute Resolution Options',
        },
        { value: 'other', label: 'Other' },
        { value: 'notSay', label: "I'd rather not say" },
      ],
      timeOptions: [
        { value: 'morning', label: 'Morning' },
        { value: 'midday', label: 'Midday' },
        { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' },
      ],
    }
  },
  computed: {
    errors() {
      return {
        name: [
          {
            test: this.name.length === 0,
            message: 'Please enter your full name',
          },
        ],
        phone: [
          {
            test: this.phone.length === 0,
            message: 'Please enter your phone number',
          },
        ],
        email: [
          {
            test: this.email.length === 0,
            message: 'Please enter your email address',
          },
          {
            test: !this.isValidEmail,
            message: 'Please provide a valid email address',
          },
        ],
        location: [
          {
            test: this.location.length === 0,
            message: 'Please select your location',
          },
        ],
        partnerName: [
          {
            test: this.partnerName.length === 0,
            message: 'This field is required',
          },
        ],
        otherName: [
          {
            test: this.otherName.length === 0,
            message: 'This field is required',
          },
        ],
        helpOption: [
          {
            test: this.helpOption.length === 0,
            message: 'Please select an option',
          },
        ],
        message: [
          {
            test: this.message.length === 0,
            message: 'Please provide details of your enquiry',
          },
        ],
        findUsOption: [
          {
            test: this.findUsOption.length === 0,
            message: 'Please select an option',
          },
        ],
        contactOption: [
          {
            test: this.contactOption.length === 0,
            message: 'Please select an option',
          },
        ],
        timeOption: [
          {
            test: this.timeOption.length === 0,
            message: 'Please select an option',
          },
        ],
        reCaptcha: [
          {
            test: this.reCaptcha,
            message: 'Failed reCAPTCHA check',
          },
        ],
      }
    },
  },
  methods: {
    test(val) {
      console.log(val)
    },
  },
}
</script>
