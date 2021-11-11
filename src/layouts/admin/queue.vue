<script>
import axios from 'axios';
import storage from '@/utils/storage';
import Header from './components/Header.vue';
import BaseInput from '@/components/input/BaseInput.vue';
export default {
  name: 'Queue',
  components: {
    Header,
    BaseInput,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: '',
      snackbarColor: 'pink',
      fetchedData: false,
      isLoading: true,
      headers: [
        {
          text: 'USERNAME',
          align: 'start',
          sortable: true,
          value: 'username',
        },
        { text: 'PROJECT TITLE', value: 'projectName' },
        { text: 'STATE', value: 'status' },
        { text: '', value: 'action' },
      ],
      desserts: null,
      queuelist: null,
      loading: false,
      outputProjects: [],
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
  mounted: function () {
    this.$nextTick(function () {
      document.querySelector('.vtk').classList.add('d-hidden');
      document.querySelector('.vtk').nextSibling.classList.add('d-hidden');
    });
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
    search(value) {
      let list = this.desserts;
      const store = this.queuelist;
      if (value) {
        const result = list.filter((user) => {
          return (
            user.username.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            user.projectName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        });
        this.desserts = result;
      } else {
        this.desserts = store;
      }
    },
    cancelSimulation(id) {
      this.$api.dashboard
        .cancelSimulation(id)
        .then(() => {
          this.errorMessage = 'Simulation canceled';
          this.snackbarColor = 'green';
          this.snackbar = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data;
          this.snackbarColor = 'pink';
          this.snackbar = true;
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
  },
};
</script>

<template>
  <div class="h-1-1 RenderingQueue">
    <Header />
    <!-- <form class="CreateProject__body h-1-1" @change="changeValues">
      <SideBar />
      <v-main class="CreateProject__simulator">
        <Simulator />
      </v-main>
    </form> -->
    <v-card
      :loading="isLoading"
      elevation="0"
      class="p-x-5 RenderingQueue__header"
    >
      <div class="d-flex jc-between">
        <div class="d-flex">
          <RouterLink
            to="/admin/queue"
            class="d-flex ai-start p-y-3 RenderingQueue__header-item"
          >
            <VIcon class="RenderingQueue__header-item-icon">$paper</VIcon>
            <span
              class="font-16-24 g-50 fw-500 RenderingQueue__header-item-title"
            >
              Rendering Queue
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/users"
            class="d-flex ai-start p-y-3 m-l-3 RenderingQueue__header-item"
          >
            <VIcon class="RenderingQueue__header-item-icon">$user</VIcon>
            <span
              class="font-16-24 g-50 fw-500 RenderingQueue__header-item-title"
            >
              Users
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/templates"
            class="d-flex ai-start p-y-3 m-l-3 RenderingQueue__header-item"
          >
            <VIcon class="RenderingQueue__header-item-icon">$template</VIcon>
            <span
              class="font-16-24 g-50 fw-500 RenderingQueue__header-item-title"
            >
              Templates
            </span>
          </RouterLink>
        </div>
        <BaseInput
          placeholder="Search"
          name="search"
          class="d-flex ai-center m-b-1"
          @changed="search"
        />
      </div>
    </v-card>
    <v-data-table
      v-if="fetchedData"
      :headers="headers"
      :items="desserts"
      :hide-default-footer="true"
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :class="[
            `RenderingQueue__status RenderingQueue__status--${item.status}`,
          ]"
          dark
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-menu rounded="lg" bottom left>
          <template v-slot:activator="{ attrs, on }">
            <div v-bind="attrs" v-on="on">
              <VIcon color="grey" dark>...</VIcon>
            </div>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500">Open</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              @click="downloadFile(item.projectId, 'config', item.projectName)"
            >
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500">
                  Download Config File
                </span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.status !== 'Running' && item.status !== 'Canceled'"
              link
              @click="downloadFile(item.id, 'output', item.projectName)"
            >
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500 d-flex">
                  Download Output File
                  <div
                    v-if="loading && outputProjects.includes(item.id)"
                    class="Dashboard__loading m-l-1"
                  >
                    <v-progress-circular
                      :size="20"
                      :width="2"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.status === 'Running'"
              link
              @click="cancelSimulation(item.id)"
            >
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500"> Cancel Simulation </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
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
.RenderingQueue {
  background-color: $background;

  @include e(header) {
    background-color: $background !important;
    border-bottom: 1px solid $dark-blue-10;

    &-item {
      width: fit-content;
    }
  }

  @include e(status) {
    max-height: 24px;
    padding: 2px 16px;
    border-radius: 12px;
    color: $white;

    @include m(Completed) {
      background-color: $success !important;
    }

    @include m(Running) {
      background-color: $primary-blue-100 !important;
    }

    @include m(Canceled) {
      background-color: $error !important;
    }

    @include m(Failed) {
      background-color: $error !important;
    }

    @include m(Pending) {
      background-color: $warning !important;
    }
  }

  .router-link-active {
    border-bottom: 2px solid $primary-blue-100;

    .RenderingQueue__header-item-title {
      color: $gray-100 !important;
    }

    .RenderingQueue__header-item-icon {
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
