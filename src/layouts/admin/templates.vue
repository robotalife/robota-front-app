<script>
import axios from 'axios';
import storage from '@/utils/storage';
import Header from './components/Header.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import FileInput from '@/components/input/FileInput.vue';
export default {
  name: 'Templates',
  components: {
    Header,
    BaseSelect,
    BaseButton,
    BaseInput,
    FileInput,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: '',
      snackbarColor: 'pink',
      fetchedData: false,
      isLoading: false,
      templateItems: [
        { text: 'Choose property', value: '' },
        { text: 'Domain', value: 'domain' },
        { text: 'Rock', value: 'rock' },
        { text: 'Fluid', value: 'fluid' },
      ],
      loading: false,
      outputProjects: [],
      addTemplateDialog: false,
    };
  },
  computed: {
    // projectConfig() {
    //   return this.$store.state?.config;
    // },
  },
  created() {
    this.queueList();
  },
  methods: {
    queueList() {
      this.$api.dashboard.fetchSimulationHistory().then((result) => {
        this.desserts = result;
        this.queuelist = result;
        this.fetchedData = true;
        this.isLoading = false;
      });
    },
    downloadFile(id, type, name) {
      if (type === 'output') {
        this.loading = true;
        this.outputProjects.push(id);
        axios({
          url: `https://sun.darsim.kariztech.com/api/v1/queue/getfile/${id}`,
          method: 'GET',
          responseType: 'blob',
          headers: {
            Authorization: 'bearer ' + storage.getItem('token'),
          },
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${name}_Output.zip`);
            document.body.appendChild(fileLink);

            fileLink.click();
            const index = this.outputProjects.indexOf(id);
            if (index > -1) {
              this.outputProjects.splice(index, 1);
            }
            this.loading = false;
          })
          .catch((error) => {
            const index = this.outputProjects.indexOf(id);
            if (index > -1) {
              this.outputProjects.splice(index, 1);
            }
            this.loading = false;
            if (error.response.status === 400) {
              this.errorMessage = 'Simulation is in progress';
              this.snackbarColor = 'pink';
              this.snackbar = true;
            } else if (error.response.status === 500) {
              this.errorMessage = 'Simulation not completed yet';
              this.snackbarColor = 'pink';
              this.snackbar = true;
            }
          });
      } else {
        axios({
          url: `https://sun.darsim.kariztech.com/api/v1/project/getconfigfile/${id}`,
          method: 'GET',
          responseType: 'blob',
          headers: {
            Authorization: 'bearer ' + storage.getItem('token'),
          },
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${name}_Config.zip`);
            document.body.appendChild(fileLink);

            fileLink.click();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.errorMessage = 'Project is empty';
              this.snackbarColor = 'pink';
              this.snackbar = true;
            } else {
              this.errorMessage = error.response.data;
              this.snackbarColor = 'pink';
              this.snackbar = true;
            }
          });
      }
    },
    changeTemp(e) {
      console.log(e);
    },
    submitAddTemp() {
      console.log('submit');
    },
  },
};
</script>

<template>
  <div class="h-1-1 Templates">
    <Header />
    <!-- <form class="CreateProject__body h-1-1" @change="changeValues">
      <SideBar />
      <v-main class="CreateProject__simulator">
        <Simulator />
      </v-main>
    </form> -->
    <v-card :loading="isLoading" elevation="0" class="p-x-5 Templates__header">
      <div class="d-flex jc-between">
        <div class="d-flex">
          <RouterLink
            to="/admin/queue"
            class="d-flex ai-start p-y-3 Templates__header-item"
          >
            <VIcon class="Templates__header-item-icon">$paper</VIcon>
            <span class="font-16-24 g-50 fw-500 Templates__header-item-title">
              Rendering Queue
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/users"
            class="d-flex ai-start p-y-3 m-l-3 Templates__header-item"
          >
            <VIcon class="Templates__header-item-icon">$user</VIcon>
            <span class="font-16-24 g-50 fw-500 Templates__header-item-title">
              Users
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/templates"
            class="d-flex ai-start p-y-3 m-l-3 Templates__header-item"
          >
            <VIcon class="Templates__header-item-icon">$template</VIcon>
            <span class="font-16-24 g-50 fw-500 Templates__header-item-title">
              Templates
            </span>
          </RouterLink>
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-col ai-center p-t-3">
      <BaseSelect
        :items="templateItems"
        :selected="templateItems[0].text"
        name="template"
        class="Templates__type"
      />
      <div class="Templates__container d-flex flex-col">
        <div @click="addTemplateDialog = true">
          <BaseButton
            size="small"
            text="+ Add Template"
            class="bg-g-80 Templates__btn w-1-1 p-1"
          />
        </div>
      </div>
    </div>
    <v-dialog v-model="addTemplateDialog" width="550" height="600">
      <form class="bg-white" @change="changeTemp">
        <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
          <p class="font-20-32 g-100 fw-600">Add Temaplte</p>
          <div class="pointer" @click="addTemplateDialog = false">
            <VIcon dark>$cross</VIcon>
          </div>
        </div>
        <hr />
        <div class="p-y-3 p-x-4 d-flex flex-col">
          <BaseInput label="Template Name" name="name" class="w-1-1" />
          <FileInput id="temp-file" class="m-t-4" name="filename" />
        </div>
        <hr />
        <div class="d-flex jc-between ai-center p-y-1-5 p-x-2 bg-white">
          <div class="w-1-3" @click.prevent="addTemplateDialog = false">
            <BaseButton
              class="bg-white Templates__btn-cancel w-1-1"
              text="Cancel"
              size="small"
            />
          </div>
          <div class="w-1-3" @click.prevent="submitAddTemp">
            <BaseButton
              class="bg-primary Templates__btn--white w-1-1"
              text="Add"
              size="small"
            />
          </div>
        </div>
      </form>
    </v-dialog>
    <v-snackbar v-model="snackbar" right multi-line>
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
@import '@/styles/global/color';
@import '@/styles/utils/bem';
.Templates {
  @include e(header) {
    background-color: $background !important;
    border-bottom: 1px solid $dark-blue-10;

    &-item {
      width: fit-content;
    }
  }

  @include e(container) {
    width: 416px;
  }

  @include e(type) {
    min-width: 416px;
  }

  @include e(btn) {
    color: $white;
    width: fit-content;

    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  .router-link-active {
    border-bottom: 2px solid $primary-blue-100;

    .Templates__header-item-title {
      color: $gray-100 !important;
    }

    .Templates__header-item-icon {
      > svg > path {
        fill: $gray-100 !important;
      }
    }
  }
}

::v-deep .BaseInput {
  background-color: $white;
  min-width: 300px;
}

::v-deep .v-data-table-header {
  background-color: $background !important;
  th:first-child {
    padding-left: 40px;
  }

  th:last-child {
    padding-right: 40px;
  }

  th > span {
    font-size: 14px;
    line-height: 16px;
    color: $gray-50;
    font-weight: 500;
  }
}

::v-deep .v-data-table__wrapper {
  tbody > tr {
    td:first-child {
      padding-left: 40px;
    }

    td:last-child {
      padding-right: 40px;
    }

    td {
      font-size: 14px;
      line-height: 16px;
      color: $gray-100;
      font-weight: 500;
    }
  }
}
</style>
