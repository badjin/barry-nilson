<template>
  <div class="tc-btn btn-arrow-link hover:text-primary" @click="$emit('click')">
    <h2 class="tc-h2" style="width: 94%">
      <slot> Read more </slot>
    </h2>
    <div class="arrow">
      <IconArrow class="icon-arrow" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    IconArrow: () => import('~/assets/svg/arrow.svg?inline'),
  },
}
</script>
<style scoped>
/* Arrow Link */
.btn-arrow-link {
  @apply font-body flex items-center;
}

.btn-arrow-link .arrow {
  @apply flex items-center pl-2;
}
.btn-arrow-link .arrow::before {
  @apply w-3 bg-primary block;

  content: '';
  height: 2px;
  transition: all ease-in-out 0.3s;
}

.btn-arrow-link:hover .arrow::before,
.btn-arrow-link:active .arrow::before {
  @apply w-6;
}

.btn-arrow-link .icon-arrow {
  @apply fill-current w-auto h-3 -m-2 text-primary;
}

@screen lg {
  .btn-arrow-link .arrow {
    @apply pl-3;
  }
  .btn-arrow-link .icon-arrow {
    @apply h-4 -m-3;
  }
  .btn-arrow-link .arrow::before {
    @apply w-4;
  }
  .btn-arrow-link:hover .arrow::before,
  .btn-arrow-link:active .arrow::before {
    @apply w-8;
  }
}
</style>
