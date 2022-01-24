<script>
import BaseInput from "@/components/input/BaseInput";
import BaseButton from "@/components/button/BaseButton";
import storage from "@/utils/storage";

export default {
  name: "Profile",
  components: { BaseButton, BaseInput },
  computed: {},
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      userEmail: storage.getItem("user")?.email,
    };
  },
  methods: {},
};
</script>

<template>
  <div class="d-flex flex-col w-1-4">
    <form>
      <BaseInput label="Name & Family Name" type="text" name="customerName" />
      <BaseInput
        label="Email"
        type="email"
        name="email"
        :value="userEmail"
        disabled
      />
      <BaseButton
        text="Submit"
        class="w-1-1 m-t-3 bg-brand-purple Profile__submit"
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

.Profile {
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
