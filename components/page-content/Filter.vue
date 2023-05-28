<template>
  <ais-refinement-list
    operator="or"
    :attribute="attribute"
    :limit="500"
    :sort-by="[sortBy]"
    class="w-full"
  >
    <template #default="{ items, refine }">
      <ButtonDropdown
        :disabled="disabled"
        :active="open && !disabled"
        @click="onClickButton()"
      >
        <div
          class="flex items-center justify-between"
          :class="disabled && 'pointer-events-none bg-opacity-50'"
        >
          <div class="capitalize pr-4">
            {{ attribute === 'rolesPosition' ? 'Position' : attribute }}
          </div>
          <div
            class="leading-none pointer-events-none"
            :class="open && 'is-active'"
          >
            <div class="accordion-item-trigger-icon"></div>
          </div>
        </div>
      </ButtonDropdown>
      <div class="relative">
        <div
          v-show="open"
          class="hidden md:block bg-steelblue text-white py-4 rounded absolute top-0 mt-2 z-50"
          :class="`${position}-0`"
          @mouseleave="open = false"
        >
          <div
            class="overflow-y-auto w-full lg:w-300px"
            style="max-height: 30rem"
          >
            <div v-for="item in orderByAlphabet(items)" :key="item.value">
              <FormCheckbox
                :label="`${item.label} (${item.count})`"
                :value="item.isRefined"
                class="menu-select"
                @input="
                  () => {
                    refine(item.value)
                  }
                "
              />
            </div>
          </div>
        </div>
        <div
          v-show="open"
          class="md:hidden bg-steelblue text-white rounded py-4 mt-2 mobile-popup"
        >
          <div v-for="item in items" :key="item.value">
            <FormCheckbox
              :label="`${item.label} (${item.count})`"
              :value="item.isRefined"
              class="menu-select"
              @input="
                () => {
                  refine(item.value)
                }
              "
            />
          </div>
        </div>
      </div>
    </template>
  </ais-refinement-list>
</template>

<script>
import vClickOutside from 'v-click-outside'
import orderBy from 'lodash-es/orderBy'
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    attribute: {
      type: String,
      default: 'categories',
    },
    position: {
      type: String,
      default: 'left',
    },
    sortBy: {
      type: String,
      default: 'count:desc',
    },
    menuClose: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  watch: {
    menuClose(value) {
      this.open = !value
    },
  },
  methods: {
    onClickOutside(event) {
      this.open = false
    },
    onClickButton() {
      if (this.disabled) return
      this.open = !this.open
      this.$emit('click')
    },
    orderByAlphabet(items) {
      return orderBy(items, ['label'], ['asc'])
    },
  },
}
</script>
<style scoped lang="scss">
.accordion-item-trigger-icon {
  @apply block right-5 m-auto border-r border-turquoise border-b;

  width: 7px;
  height: 7px;
  transform: translateY(-1.5px) rotate(45deg);
  transition: transform 0.2s ease;

  .is-active & {
    transform: translateY(1.5px) rotate(225deg);
  }
}

.menu-select {
  @apply px-4 py-2 capitalize;
}

@screen md {
  .menu-select {
    @apply hover:bg-primary;
  }
}

.mobile-popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  max-height: 30rem;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
