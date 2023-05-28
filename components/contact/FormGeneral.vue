<template>
  <form
    class="tc-form"
    name="Contact-General"
    action="/get-in-touch/?success=true&form=3#content"
    method="POST"
    netlify-honeypot="bot-field"
    data-netlify-recaptcha="true"
    data-netlify="true"
    @submit="submit"
  >
    <input type="hidden" name="form-name" value="Contact-General" />
    <p class="hidden">
      <label>
        Don’t fill this out if you’re human: <input name="bot-field" />
      </label>
    </p>
    <fieldset>
      <div class="grid md:grid-cols-2 gap-x-8 items-end">
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
        <div class="form-field">
          <TextInput v-model="company" name="company" />
          <FormLabel>Company</FormLabel>
        </div>
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
          :message="getErrorMessage('interestedInOption')"
        />
        <FormCustomSelect
          :error-tag="
            showErrors && getErrorMessage('interestedInOption') ? true : false
          "
          option-name="Interested in"
          label="Are you interested in?"
          :options="interestedInOptions"
          @input="(value) => (interestedInOption = value)"
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
      formName: 'General',
      company: '',
      interestedInOption: '',
      interestedInOptions: [
        { value: 'careers', label: 'Careers' },
        { value: 'mediaEnquiry', label: 'Media Enquiry' },
        { value: 'newsInsight', label: 'News & Insight' },
        { value: 'Education', label: 'Education & Training' },
        { value: 'Sponsorthips', label: 'Sponsorthips & Partnerships' },
        { value: 'other', label: 'Other' },
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
        interestedInOption: [
          {
            test: this.interestedInOption.length === 0,
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
        reCaptcha: [
          {
            test: this.reCaptcha,
            message: 'Failed reCAPTCHA check',
          },
        ],
      }
    },
  },
}
</script>
