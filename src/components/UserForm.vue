<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import UWTextField from '@/components/design-system/atoms/UWTextField.vue';
import UWAutocompleteField from '@/components/design-system/moleculas/UWAutocompleteField.vue';
import countries from '@/components/countries.json';
import UWPrimaryButton from '@/components/design-system/atoms/UWPrimaryButton.vue';
import isRequired from '@/validation-rules/isRequired';
import minStr from '@/validation-rules/minStr';
import usaTax from '@/validation-rules/usaTax';
import canadaTax from '@/validation-rules/canadaTax';
import usersService from '@/services/usersService';

interface IForm {
  username: string,
  country: string,
  tax: string
}

type FormFields = keyof IForm;

export default defineComponent({
  components: {
    UWPrimaryButton,
    UWAutocompleteField,
    UWTextField,
  },

  setup() {
    const isLoading = ref(false);
    const isSent = ref(false);

    const user = reactive({
      username: '',
      country: '',
      tax: '',
    });

    const emptyErrors = {
      username: '',
      country: '',
      tax: '',
    };

    const errors = reactive(emptyErrors);

    const rules = computed(() => ({
      username: [
        isRequired('Username must not be empty.'),
        minStr(3),
      ],
      country: [
        isRequired('Country must be selected from the list.'),
      ],
      tax: [
        isRequired('Tax identifier must not be empty.'),
        ...(user.country === 'United States of America' ? [usaTax()] : []),
        ...(user.country === 'Canada' ? [canadaTax()] : []),
      ],
    }));

    const onSubmit = (e: Event) => {
      e.preventDefault();

      isSent.value = false;
      let hasError = false;

      // Clear error messages
      Object.keys(emptyErrors).forEach((k) => {
        errors[(k as FormFields)] = '';
      });

      // Go through validation rules
      Object.keys(rules.value).forEach((k) => {
        const fieldErrors = rules.value[(k as FormFields)]
          .map((rule) => rule(user[(k as FormFields)]))
          .filter((err) => err);

        if (fieldErrors.length) {
          const [err] = fieldErrors;
          errors[(k as FormFields)] = err;
          hasError = true;
        }
      });

      if (!hasError) {
        isLoading.value = true;
        usersService.save(user);

        // TODO not needed in production. Only to make loading effects noticable
        setTimeout(() => {
          isLoading.value = false;
          isSent.value = true;
        }, 3000);
      }
    };

    return {
      isLoading,
      isSent,
      countries,
      user,
      errors,
      onSubmit,
    };
  },
});
</script>

<template>
  <form @submit="onSubmit">
    <UWTextField
      v-model:value="user.username"
      label="User name"
      name="username"
      data-test="username"
      :error="errors.username"
      :disabled="isLoading"
    />

    <UWAutocompleteField
      v-model:value="user.country"
      label="Country (TODO: keyboard navigation, collapse on click outside)"
      name="country"
      data-test="country"
      :options="countries"
      :error="errors.country"
      :disabled="isLoading"
    />

    <UWTextField
      v-model:value="user.tax"
      label="Tax identifier (TBD: mask could be added here)"
      name="tax"
      data-test="tax"
      :error="errors.tax"
      :disabled="isLoading"
    />

    <UWPrimaryButton
      text="Save"
      type="submit"
      data-test="save-btn"
      :disabled="isLoading"
    />

    <span
      v-if="isLoading"
      class="text-yellow-300 ml-1"
    >
      Sending...
    </span>

    <span
      v-if="isSent"
      class="text-emerald-400 ml-1"
    >
      Successfully sent!!!
    </span>
  </form>
</template>
