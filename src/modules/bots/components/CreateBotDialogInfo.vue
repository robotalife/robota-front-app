<script>
export default {
  name: "CreateBotDialogInfo",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    value: {
      type: [String, Number],
      default: "Value",
    },
  },
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<template>
  <div>
    <div class="CreateBotDialogInfo__dialog-info">
      <p class="CreateBotDialogInfo__dialog-info-text-title">{{ title }}</p>
      <p class="CreateBotDialogInfo__dialog-info-text-value">
        {{ value }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.CreateBotDialogInfo {
  @include e(dialog-info-text-title) {
    font-weight: 500;
    font-size: 14px;
    font-height: 20px;
    color: $gray-700;
    width: 50%;
  }
  @include e(dialog-info-text-value) {
    font-weight: 400;
    font-size: 14px;
    font-height: 20px;
    color: $gray-700;
  }
  @include e(dialog-info) {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
  }
}
</style>
