<script lang="ts">
import { computed, defineComponent } from 'vue';
import UWFormControl from '@/components/design-system/atoms/UWFormControl.vue';
import fromControlPropsMixin from '@/components/design-system/atoms/fromControlPropsMixin';

export default defineComponent({
  components: { UWFormControl },

  inheritAttrs: false,

  props: {
    ...fromControlPropsMixin,

    value: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },
  },

  emits: ['update:value'],

  setup(props) {
    const classes = computed(() => {
      const baseClasses = 'mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2';

      return `${baseClasses} ${!props.error ? 'mb-4' : 'border-red-600'}`;
    });

    return {
      classes,
    };
  },
});
</script>

<template>
  <UWFormControl
    :id="id"
    :label="label"
    :name="name"
    :error="error"
  >
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="value"
      :class="classes"
      v-bind="$attrs"
      @input="$emit('update:value', $event.target.value.trim())"
    >
  </UWFormControl>
</template>
