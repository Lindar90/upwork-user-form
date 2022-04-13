<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <button
    class="px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm opacity-100"
    v-bind="$attrs"
    v-text="text"
  />
</template>
