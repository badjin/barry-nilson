<template>
  <div class="overflow-hidden formie-form">
    <form v-if="form" ref="form" novalidate @submit.prevent="onSubmit">
      <alert
        :model-value="alertState"
        :success-text="form.settings.submitActionMessageHtml"
        :error-text="form.settings.errorMessageHtml"
        @update:modelValue="(val) => (alertState = val)"
      />

      <div v-if="form.settings.displayFormTitle" class="text-center">
        <h2 class="text-xl leading-6 font-semibold text-dark-500 my-4 sm:my-6">
          {{ form.title }}
        </h2>

        <hr />
      </div>

      <div
        v-if="
          form.settings.displayPageTabs &&
          !(alertState && form.settings.submitActionFormHide)
        "
        class="px-4 sm:px-6"
      >
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="(page, index) in form.pages"
            :key="index"
            href="#"
            :class="
              index == activePage
                ? 'border-green-300 text-green-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                : 'border-transparent text-dark-2000 hover:text-dark-400 hover:border-green-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            "
            @click.prevent="onTabClick(index)"
          >
            {{ page.name }}
          </a>
        </nav>
      </div>

      <div
        v-if="
          form.settings.displayPageProgress &&
          !(alertState && form.settings.submitActionFormHide)
        "
        class="mt-4 px-4 sm:px-6"
      >
        <div
          class="flex h-5 overflow-hidden text-xs font-medium text-white rounded-sm bg-gray-200"
        >
          <div
            class="flex flex-col justify-center text-center bg-green-300"
            :style="'width: ' + stepPercentage + '%'"
            role="progressbar"
            :aria-valuenow="stepPercentage"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span class="">{{ stepPercentage }}%</span>
          </div>
        </div>
      </div>
      <template v-for="(page, index) in form.pages">
        <template v-if="!(alertState && form.settings.submitActionFormHide)">
          <formie-page
            :key="index"
            :ref="'page-' + index"
            :model-value="activePage"
            :page="page"
            :page-index="index"
            :form="form"
            :loading="loading"
            @update:modelValue="(val) => (activePage = val)"
          />
        </template>
      </template>
    </form>

    <div
      v-else-if="form === null"
      class="bg-white p-24 text-center text-red-500"
    >
      Unable to find form "{{ handle }}".
    </div>

    <div v-else class="bg-white p-24 text-center text-red-500">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="loading loading-lg"></div>
    </div>
  </div>
</template>

<script>
import Pristine from 'pristinejs'
import {
  getFormMutation,
  getMutationVariables,
} from '@/models/formie/mutations'
import {
  resetValidation,
  runValidation,
  applyServerValidation,
} from '@/models/formie/validation'

import { FormieConditions } from '@/models/formie/conditions'

export default {
  props: {
    form: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      activePage: 0,
      error: false,
      loading: false,
      alertState: null,
      validator: null,
      conditions: null,
    }
  },

  computed: {
    handle() {
      return this.form.handle
    },
    stepPercentage() {
      return parseInt(
        ((this.activePage + 1) / this.form.pages.length) * 100,
        10
      )
    },
  },

  mounted() {
    this.conditions = new FormieConditions({ $form: this.$refs.form })
  },

  // apollo: {
  //   form: {
  //     query: FormQuery,
  //     variables() {
  //       return { handle: this.handle }
  //     },
  //     error(error) {
  //       this.error = error.message
  //     },

  //     // Figure out why fragments don't work without this??
  //     fetchPolicy: 'no-cache',
  //   },
  // },

  methods: {
    onTabClick(index) {
      this.activePage = index
    },

    async onSubmit(e) {
      this.loading = true
      this.alertState = false

      // Always validate the current page only, not the entire form
      const $form = this.$refs.form
      const $page = this.$refs[`page-${this.activePage}`][0].$el

      // Setup a validator
      this.validator = new Pristine($form)

      // Clear out validation errors
      resetValidation($form)

      const dod = true

      if (dod) {
        const isLastPage = this.activePage === this.form.pages.length - 1
        const valid = runValidation(this.validator, $page)

        // Validate the form - for each page
        if (!valid) {
          this.loading = false
          this.alertState = 'error'

          return
        }

        // Are we on the last page, or on a multi-step page?
        if (!isLastPage) {
          this.loading = false

          return (this.activePage += 1)
        }

        // Prepare an object from FormData
        const formData = await getMutationVariables(this.form, $form)

        // Generate a mutation string, with all the input types sorted
        const formMutation = getFormMutation(this.form)

        this.$apolloClient
          .mutate({
            mutation: formMutation,
            variables: formData,
          })
          .then(({ data }) => {
            this.loading = false

            const response = data[`save_${this.handle}_Submission`]
            this.onSuccess(response)
          })
          .catch((error) => {
            this.loading = false
            this.alertState = 'error'

            // Apply server-side errors
            applyServerValidation(this.validator, $form, error)

            console.error(error)
            console.error(error.message)
          })
      }
    },

    onSuccess(response) {
      if (this.form.settings.submitAction === 'message') {
        this.alertState = 'success'
      }

      this.$refs.form.reset()
    },
  },
}
</script>
