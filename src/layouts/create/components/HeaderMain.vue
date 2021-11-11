<script>
import VBtn from 'vuetify/lib/components/VBtn';
import VIcon from 'vuetify/lib/components/VIcon';
import VTooltip from 'vuetify/lib/components/VTooltip';
import NameInput from '@/components/input/NameInput.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import storage from '@/utils/storage';
export default {
  name: 'HeaderMain',
  components: {
    VBtn,
    VIcon,
    NameInput,
    BaseButton,
    VTooltip,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date: '14 Jun, 202',
      projectName: this.$store.state?.config.name,
      isAdminUser: '',
      userInfo: '',
    };
  },
  created() {
    this.isAdminUser = storage.getItem('user').admin;
    this.userInfo =
      storage.getItem('user').firstName +
      ' ' +
      storage.getItem('user').lastName;
  },
  methods: {
    saveProject() {
      return this.$emit('clicked', this.projectName);
    },
    changeName(name) {
      this.label = false;
      this.projectName = name;
      this.$store.commit('SET_CONFIG', {
        id: '',
        name: name,
      });
    },
    submitSimulation() {
      this.$api.project
        .executeProject(this.$store.state?.config.id)
        .then(() => {
          return this.$emit('clicked', {
            message: 'Simulation submitted successfully',
            color: 'green',
          });
        });
    },
    logout() {
      storage.removeItem('token');
      storage.removeItem('user');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
<template>
  <div class="d-flex jc-between ai-center HeaderMain p-x-3 p-y-1 bg-white">
    <div class="d-flex">
      <router-link to="/">
        <VBtn class="bg-db-10" fab dark depressed>
          <VIcon dark>$arrowLeft</VIcon>
        </VBtn>
      </router-link>
      <div class="d-flex flex-col m-l-2">
        <VTooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <NameInput v-bind="attrs" v-on="on" @changed="changeName" />
          </template>
          <span>project name</span>
        </VTooltip>
        <p class="font-14-24 g-65 p-l-1">
          {{ date }}
        </p>
      </div>
    </div>
    <div class="d-flex">
      <div @click.prevent="saveProject">
        <BaseButton
          :disabled="label"
          class="HeaderMain__btn-save font-14-24"
          text="Create"
          size="small"
        />
      </div>
      <div @click.prevent="saveProject">
        <BaseButton
          :disabled="!label"
          class="HeaderMain__btn-save font-14-24 m-l-1"
          text="Save"
          size="small"
        />
      </div>
      <div
        class="p-r-1 m-r-1 HeaderMain__separator"
        @click.prevent="submitSimulation"
      >
        <BaseButton
          class="HeaderMain__btn-submit m-l-1 font-14-24"
          text="Sumbit Simulation"
          size="smal"
        />
      </div>
      <v-menu rounded="lg" offset-y transition="scale-transition">
        <template v-slot:activator="{ attrs, on }">
          <div class="d-flex ai-center" v-bind="attrs" v-on="on">
            <VIcon color="grey" class="HeaderMain__profile" dark>$user</VIcon>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <span class="g-65 font-14-24 fw-500 m-l-1">{{ userInfo }}</span>
            </v-list-item-title>
          </v-list-item>
          <hr />
          <v-list-item @click="logout">
            <v-list-item-title>
              <VIcon dark>$logout</VIcon>
              <span class="g-65 font-14-24 fw-500 m-l-1">Logout</span>
            </v-list-item-title>
          </v-list-item>
          <router-link v-if="isAdminUser" to="/admin/queue">
            <v-list-item>
              <v-list-item-title>
                <VIcon dark>$admin</VIcon>
                <span class="g-65 font-14-24 fw-500 m-l-1">Admin</span>
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.HeaderMain {
  box-shadow: inset 0 -1px 0 0 $dark-blue-10;
  max-height: 64px;

  .v-btn--fab {
    max-height: 48px;
    max-width: 48px;
  }

  @include e(profile) {
    background-color: $gray-65;
    width: 32px;
    height: 32px;
    padding: 2px 0px 0px 6px;
    border-radius: 18px;
  }

  @include e(separator) {
    border-right: 1px solid $gray-65;
  }

  @include e(btn) {
    &-save {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
      width: 88px;
    }

    &-submit {
      background-color: $primary-blue-100 !important;
      color: $white;
      max-width: 168px;
    }
  }
}
</style>
