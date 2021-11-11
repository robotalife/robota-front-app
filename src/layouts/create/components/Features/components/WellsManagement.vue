<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import FileInput from '@/components/input/FileInput.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
export default {
  name: 'Wells',
  components: {
    SwitchRadioGroup,
    FileInput,
    BaseButton,
    VBtn,
    VIcon,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      switchGroup: 0,
      dialog2: false,
    };
  },
  methods: {
    changedSwitch(value) {
      this.switchGroup = value;
    },
  },
};
</script>

<template>
  <div>
    <div class="d-flex ai-center jc-between p-y-2 p-x-3">
      <p class="font-20-32 g-100 fw-600">Wells Management</p>
      <div @click="dialog2 = true">
        <VIcon dark>$cross</VIcon>
      </div>
    </div>
    <hr />
    <div class="d-flex p-y-2 p-x-3">
      <BaseButton
        size="small"
        text="+ Add Well"
        class="bg-g-80 Wells__btn--white w-1-2"
      />
      <BaseButton
        size="small"
        text="Export"
        class="bg-white Wells__btn-export m-l-2 w-1-2"
      />
    </div>
    <hr />
    <div class="p-4">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Wells {
  @include e(btn) {
    &-export {
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }
}
</style>
