<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import UWFormControl from '@/components/design-system/atoms/UWFormControl.vue';
import UWTextField from '@/components/design-system/atoms/UWTextField.vue';
import fromControlPropsMixin from '@/components/design-system/atoms/fromControlPropsMixin';

export default defineComponent({
  components: {
    UWTextField,
    UWFormControl,
  },

  inheritAttrs: false,

  props: {
    ...fromControlPropsMixin,

    value: {
      type: String,
      default: '',
    },

    options: {
      type: Array as () => string[],
      required: true,
    },
  },

  emits: ['update:value'],

  setup(props, { emit }) {
    const search = ref(props.value);
    const isOpenList = ref(false);

    const filteredOptions = computed(() => props.options
      .filter((o) => o.toLowerCase().includes(search.value.toLowerCase())));

    const onSearchChange = (e: Event) => {
      search.value = (e.target as HTMLInputElement).value;
      isOpenList.value = true;
    };

    const onSelectOption = (option: string) => {
      search.value = option;
      isOpenList.value = false;

      emit('update:value', option);
    };

    return {
      search,
      isOpenList,
      filteredOptions,
      onSearchChange,
      onSelectOption,
    };
  },
});
</script>

<template>
  <div class="relative">
    <UWFormControl
      :id="id"
      :label="label"
      :name="name"
      class="relative"
    >
      <UWTextField
        :name="name"
        :value="search"
        :error="error"
        v-bind="$attrs"
        @input="onSearchChange"
      />
    </UWFormControl>

    <div
      v-if="isOpenList"
      class="absolute border-x border-gray-300 z-50 left-0
      right-0 top-full bg-white max-h-56 overflow-scroll"
    >
      <div
        v-for="option in filteredOptions"
        :key="option"
        class="px-3 py-2 border-b border-gray-300 hover:bg-slate-100 hover:cursor-pointer"
        @click="onSelectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
