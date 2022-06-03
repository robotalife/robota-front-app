<script>
import BaseInput from "@/components/input/BaseInput";
import BaseButton from "@/components/button/BaseButton";

export default {
  name: "Security",
  components: { BaseInput, BaseButton },
  computed: {
    valuesItem() {
      return [
        {
          label: "Current Password",
          name: "currentPassword",
        },
        {
          label: "New Password",
          name: "newPassword",
        },
        {
          label: "Repeat New Password",
          name: "newPasswordRepeat",
        },
      ];
    },
  },
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      inputValues: {
        currentPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      },
    };
  },
  methods: {},
};
</script>

<template>
  <div class="d-flex flex-col w-1-4">
    <p class="font-h-3 brand-purple fw-700">Change Password</p>
    <form>
      <BaseInput
        v-for="item in valuesItem"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-model="inputValues[item.name]"
      />
      <BaseButton
        text="Submit"
        class="w-1-2 m-t-3 bg-brand-purple Security__submit"
        size="small"
      />
    </form>
    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Security {
  @include e(submit) {
    color: $white;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }

    @include e(reset) {
      color: $blue;
    }

    @include e(error) {
      color: $error;
    }
  }
}
</style>
