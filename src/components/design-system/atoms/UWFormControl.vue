<script lang="ts">

import { defineComponent } from 'vue';
import fromControlPropsMixin from '@/components/design-system/atoms/fromControlPropsMixin';

export default defineComponent({
  props: {
    ...fromControlPropsMixin,
  },
});
</script>

<template>
  <label
    :for="id || name"
    class="mt-1"
  >
    {{ label }}

    <slot />

    <p
      v-if="error"
      class="text-xs text-red-600"
    >{{ error }}</p>
  </label>
</template>
