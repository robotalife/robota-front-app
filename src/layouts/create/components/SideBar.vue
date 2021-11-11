<script>
import Tabs from '@/components/tabs/Tabs.vue';
import Domain from './Domain/Index.vue';
import Properties from './Properties/Index.vue';
import Features from './Features/Index.vue';
import Simulation from './Simulation/Index.vue';
export default {
  name: 'SideBar',
  components: {
    Tabs,
    Properties,
    Domain,
    Features,
    Simulation,
  },
  data() {
    return {
      tabs: [
        { index: 1, title: 'Domain', link: '/domain' },
        { index: 2, title: 'Properties', link: '/properties' },
        { index: 3, title: 'Features', link: '/features' },
        { index: 4, title: 'Simulation', link: '/simulation' },
      ],
      tab: 1,
    };
  },
  methods: {
    changedTab(value) {
      this.tab = value;
    },
  },
};
</script>
<template>
  <div class="d-flex flex-col h-1-1">
    <Tabs :items="tabs" @clicked="changedTab" />
    <!-- <GroupSwitch :items="items" /> -->
    <v-tabs-items v-model="tab" class="Sidebar">
      <Domain />
      <Properties />
      <Features />
      <Simulation />
    </v-tabs-items>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Sidebar {
  overflow-y: scroll;
  max-height: 88vh;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f7fa;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #bec4cb;
  }

  &::-webkit-scrollbar-track {
    border-radius: 2px;
    //-webkit-box-shadow: inset 0 0 0 1px #fff;
  }
}
</style>
