<script>
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "TextField",
  components: {
    VIcon,
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    section: {
      type: String,
      default: "",
    },
    next: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unitMetadata: {
      type: String,
      default: "",
    },
    isHorizontal: {
      type: Boolean,
      default: false,
    },
    step: {
      type: String,
      default: "any",
    },
    minValue: {
      type: Number,
      default: 0,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeValue() {
      return this.$emit("changed", this.value);
    },
  },
};
</script>

<template>
  <div :class="['font-14-24 g-100', isHorizontal ? 'd-flex' : '']">
    <label :class="['m-b-0 d-flex jc-between', isHorizontal ? 'm-r-5' : '']">
      <span :class="[isHorizontal ? 'd-flex items-center' : '']">{{ label }}</span>
      <span class="d-flex" v-if="unitMetadata">
        <VIcon class="TextField__metadata-icon">$portfolio</VIcon>
        {{ unitMetadata }}
      </span>
    </label>
    <div :class="['TextField d-flex', { icon: 'p-r-0-5', unit: 'p-r-2' }]">
      <v-text-field
        solo
        v-model="value"
        :placeholder="placeholder"
        :rules="rules"
        :name="name"
        class="w-1-1 TextField__input"
        :data-section="section"
        :data-next="next"
        :type="type"
        :disabled="disabled"
        @input="(e) => $emit('input', e.target.value)"
      />
      <VIcon v-if="icon" dark>{{ icon }}</VIcon>
      <span v-if="unit" class="font-14-24 g-65 p-r-2 nowrap">{{ unit }}</span>
    </div>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

::v-deep .v-input__slot {
  box-shadow: none !important;
}

.TextField {
  &__input {
    ::v-deep {
      .v-input__slot {
        height: 48px;
        border: 1px solid #000000;
      }

      .v-messages__message {
        color: #ef2a2a !important;
      }
    }
  }

  &:focus-within {
    border-color: $primary-blue-100 !important;
  }

  &:hover {
    border-color: $gray-50;
  }

  .disabled {
    border: solid 1px $dark-blue-20;
    background-color: $dark-blue-05;
  }

  @include e(metadata-icon) {
    > svg {
      height: 14px;
    }
  }
}
</style>
