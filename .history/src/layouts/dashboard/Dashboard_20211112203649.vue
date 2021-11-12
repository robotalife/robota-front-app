<script>
import axios from "axios";
import Header from "./components/Header.vue";
import VIcon from "vuetify/lib/components/VIcon";
import storage from "@/utils/storage";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    VIcon,
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      snackbar: false,
      dialog2: false,
      errorMessage: "",
      snackbarColor: "pink",
      projectList: null,
      modelTitle: "",
      loading: false,
      outputProjects: [],
      changePasswordDialog: false,
      userPassword: {
        currentPassword: "",
        newPassword: "",
      },
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      document.querySelector(".vtk").classList.add("d-hidden");
      document.querySelector(".vtk").nextSibling.classList.add("d-hidden");
    });
  },
  methods: {
    showHistory(modal = true) {
      this.$api.dashboard.fetchSimulationHistory().then((result) => {
        this.projectList = null;
        this.projectList = result;
        this.modelTitle = "Simulation History";
        modal ? (this.dialog2 = true) : null;
      });
    },
    transformDate(date, doneTime) {
      let stringDate = new Date(date);
      let done = new Date(doneTime);
      return Math.ceil((done - stringDate) / (1000 * 60));
    },
    showSavedProjects(modal = true) {
      this.$api.dashboard.fetchSavedProject().then((result) => {
        this.projectList = null;
        this.projectList = result;
        this.modelTitle = "Saved Projects";
        modal ? (this.dialog2 = true) : null;
      });
    },
    downloadFile(id, type, name) {
      if (type === "output") {
        this.loading = true;
        this.outputProjects.push(id);
        axios({
          url: `https://sun.darsim.kariztech.com/api/v1/queue/getfile/${id}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: "bearer " + storage.getItem("token"),
          },
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", `${name}_Output.zip`);
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
              this.errorMessage = "Simulation is in progress";
              this.snackbarColor = "pink";
              this.snackbar = true;
            } else if (error.response.status === 500) {
              this.errorMessage = "Simulation not completed yet";
              this.snackbarColor = "pink";
              this.snackbar = true;
            }
          });
      } else {
        axios({
          url: `https://sun.darsim.kariztech.com/api/v1/project/getconfigfile/${id}`,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: "bearer " + storage.getItem("token"),
          },
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", `${name}_Config.zip`);
            document.body.appendChild(fileLink);

            fileLink.click();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.errorMessage = "Project is empty";
              this.snackbarColor = "pink";
              this.snackbar = true;
            } else {
              this.errorMessage = error.response.data;
              this.snackbarColor = "pink";
              this.snackbar = true;
            }
          });
      }
    },
    remove(id) {
      this.$api.dashboard.removeProject(id).then(() => {
        // projectList
        this.dialog2 = false;
        this.errorMessage = "Simulation canceled";
        this.snackbarColor = "green";
        this.snackbar = true;
      });
    },
    cancelSimulation(id) {
      this.$api.dashboard
        .cancelSimulation(id)
        .then(() => {
          this.errorMessage = "Simulation canceled";
          this.snackbarColor = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data;
          this.snackbarColor = "pink";
          this.snackbar = true;
        });
    },
    search(value) {
      let list = this.projectList;
      if (value) {
        const result = list.filter((project) => {
          if (project.projectName) {
            return (
              project.projectName.toLowerCase().indexOf(value.toLowerCase()) !==
              -1
            );
          } else {
            return (
              project.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
          }
        });
        this.projectList = result;
      } else {
        if (this.modelTitle === "Simulation History") {
          this.showHistory(false);
        } else {
          this.showSavedProjects(false);
        }
      }
    },
    redirectToNew() {
      this.$store.commit("SET_NEW_CONFIG", this.$store.state?.sampleConfig);
      this.$store.commit("SET_CONFIG", {
        id: "",
        name: "Untitled simulation",
      });
      this.$router.push("/new");
    },
    showModals(value) {
      if (value === "Queue") {
        this.showHistory(true);
      } else if (value === "Projects") {
        this.showSavedProjects(true);
      } else {
        this.changePasswordDialog = true;
      }
    },
    changePassword(e) {
      const value = e.target.value;
      const name = e.target.name;
      this.userPassword[name] = value;
    },
    submitChangePassword() {
      this.$api.auth
        .changePassword(this.userPassword)
        .then(() => {
          this.errorMessage = "Password Changed successfully";
          this.snackbarColor = "green";
          this.snackbar = true;
          this.changePasswordDialog = false;
        })
        .catch((error) => {
          this.errorMessage = error.response.data;
          this.snackbarColor = "pink";
          this.snackbar = true;
          this.changePasswordDialog = false;
        });
    },
  },
};
</script>

<template>
  <div class="h-1-1">
    <Header @clicked="showModals" />
    <div class="Dashboard h-1-1 d-flex ai-center jc-center">
      <div @click="redirectToNew">
        <div
          class="d-flex flex-col ai-center jc-center Dashboard__card bg-primary p-y-8 p-x-2"
        >
          <VIcon class="Dashboard__card-icon" size="32" dark>$add</VIcon>
          <p class="font-14-24 fw-500 m-t-4 Dashboard__card-title">
            New Project
          </p>
        </div>
      </div>
      <div
        class="d-flex flex-col ai-center jc-center Dashboard__card bg-white p-y-8 p-x-2 m-l-4"
      >
        <VIcon size="24" dark>$load</VIcon>
        <p class="font-14-24 fw-500 m-t-4">Load From File</p>
      </div>
      <div
        class="d-flex flex-col ai-center jc-center Dashboard__card bg-white p-y-8 p-x-2 m-l-4"
        @click="showHistory"
      >
        <VIcon size="24" dark>$history</VIcon>
        <p class="font-14-24 fw-500 m-t-4">Simulation history</p>
      </div>
      <div
        class="d-flex flex-col ai-center jc-center Dashboard__card bg-white p-y-8 p-x-2 m-l-4"
        @click="showSavedProjects"
      >
        <VIcon size="24" dark>$saved</VIcon>
        <p class="font-14-24 fw-500 m-t-4">Saved Projects</p>
      </div>
    </div>
    <v-dialog v-model="dialog2" width="550" height="600">
      <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
        <p class="font-20-32 g-100 fw-600">{{ modelTitle }}</p>
        <div class="pointer" @click="dialog2 = false">
          <VIcon dark>$cross</VIcon>
        </div>
      </div>
      <hr />
      <div class="bg-white p-x-3 p-y-2">
        <BaseInput placeholder="Search" name="search" @changed="search" />
      </div>
      <v-list class="p-t-0" dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in projectList"
            :key="index"
            class="p-x-3"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex flex-col">
                <div v-if="modelTitle === 'Simulation History'" class="d-flex">
                  <span class="font-16-24 fw-500 m-r-1">
                    {{ item.projectName }}
                  </span>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <VIcon
                        v-if="item.status === 'Completed'"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        $check
                      </VIcon>
                      <VIcon
                        v-else-if="item.status === 'Running'"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        $clock
                      </VIcon>
                      <VIcon
                        v-else-if="item.status === 'Canceled'"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        $close
                      </VIcon>
                      <VIcon
                        v-else-if="item.status === 'Pending'"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        $list
                      </VIcon>
                      <VIcon v-else dark v-bind="attrs" v-on="on">
                        $failed
                      </VIcon>
                    </template>
                    <span>{{ item.status }}</span>
                  </v-tooltip>
                </div>
                <span v-else class="font-16-24 fw-500">
                  {{ item.name }}
                </span>
                <p
                  v-if="modelTitle === 'Simulation History'"
                  class="font-14-24 g-65"
                >
                  <span v-if="item.status === 'Completed'">
                    Simulation done in
                    {{
                      transformDate(
                        item.simulationRequestTime,
                        item.simulationRequestDoneTime
                      )
                    }}&nbsp;minutes,
                    {{
                      new Date(item.simulationRequestDoneTime).toLocaleString()
                    }}
                  </span>
                  <span v-else-if="item.status === 'Running'">
                    Simulation started in
                    {{ transformDate(item.simulationRequestTime, new Date()) }}
                    &nbsp;minutes ago,
                    {{
                      new Date(item.simulationRequestDoneTime).toLocaleString()
                    }}
                  </span>
                  <span v-else-if="item.status === 'Canceled'">
                    Simulation canceled by,
                    {{
                      new Date(item.simulationRequestDoneTime).toLocaleString()
                    }}
                  </span>
                  <span v-else>
                    Simulation failed,
                    {{
                      new Date(item.simulationRequestDoneTime).toLocaleString()
                    }}
                  </span>
                </p>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="d-flex ai-ceter jc-center">
              <v-row>
                <v-menu rounded="lg" bottom left>
                  <template v-slot:activator="{ attrs, on }">
                    <div
                      :class="[
                        'bg-white Dashboard__more',
                        modelTitle === 'Simulation History' ? 'm-t-2' : '',
                      ]"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <VIcon color="grey" dark>...</VIcon>
                    </div>
                  </template>
                  <v-list>
                    <router-link
                      v-if="modelTitle !== 'Simulation History'"
                      :to="'/project/' + item.id"
                    >
                      <v-list-item link>
                        <v-list-item-title>
                          <span class="g-65 font-14-24 fw-500">Open</span>
                        </v-list-item-title>
                      </v-list-item>
                    </router-link>
                    <v-list-item v-else link>
                      <v-list-item-title>
                        <span class="g-65 font-14-24 fw-500">Open</span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      link
                      @click="
                        downloadFile(
                          modelTitle !== 'Simulation History'
                            ? item.id
                            : item.projectId,
                          'config',
                          modelTitle !== 'Simulation History'
                            ? item.name
                            : item.projectName
                        )
                      "
                    >
                      <v-list-item-title>
                        <span class="g-65 font-14-24 fw-500">
                          Download Config File
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="
                        modelTitle === 'Simulation History' &&
                        item.status !== 'Running' &&
                        item.status !== 'Canceled'
                      "
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
                      v-if="
                        modelTitle === 'Simulation History' &&
                        item.status === 'Running'
                      "
                      link
                      @click="cancelSimulation(item.id)"
                    >
                      <v-list-item-title>
                        <span class="g-65 font-14-24 fw-500">
                          Cancel Simulation
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="modelTitle !== 'Simulation History'"
                      link
                      @click="remove(item.id)"
                    >
                      <v-list-item-title>
                        <span class="g-65 font-14-24 fw-500">Remove</span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-row>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-dialog>
    <v-dialog v-model="changePasswordDialog" width="550" height="600">
      <form @change="changePassword">
        <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
          <p class="font-20-32 g-100 fw-600">Change Password</p>
          <div class="pointer" @click="changePasswordDialog = false">
            <VIcon dark>$cross</VIcon>
          </div>
        </div>
        <hr />
        <div
          v-if="changePasswordDialog"
          class="d-flex flex-col p-y-3 p-x-4 bg-white w-1-1"
        >
          <BaseInput
            label="Current Password"
            name="currentPassword"
            class="w-1-1"
          />
          <BaseInput
            label="New Password"
            name="newPassword"
            class="w-1-1 m-t-3"
          />
        </div>
        <hr />
        <div class="d-flex jc-between ai-center p-y-1-5 p-x-2 bg-white">
          <div class="w-1-3" @click.prevent="changePasswordDialog = false">
            <BaseButton
              class="bg-white Dashboard__btn-cancel w-1-1"
              text="Cancel"
              size="small"
            />
          </div>
          <div class="w-1-3" @click.prevent="submitChangePassword">
            <BaseButton
              class="bg-primary Dashboard__btn--white w-1-1"
              text="Apply"
              size="small"
            />
          </div>
        </div>
      </form>
    </v-dialog>
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
.Dashboard {
  background-color: #f1f2f4;
  max-height: 92vh;

  @include e(btn) {
    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  @include e(status) {
    height: 10px;
    width: 10px;
    border-radius: 10px;

    @include m(Completed) {
      background-color: $success;
    }

    @include m(Running) {
      background-color: $primary-blue-100;
    }

    @include m(Pending) {
      background-color: $warning;
    }

    @include m(Canceled) {
      background-color: $error;
    }
  }

  @include e(card) {
    border-radius: 10px;
    max-height: 188px;
    min-width: 170px;
    cursor: pointer;

    &-title {
      color: $white;
    }

    &:hover {
      border: 1px solid $primary-blue-100;
    }

    &-icon {
      transform: rotate(45deg);
    }
  }

  @include e(more) {
    width: 32px;
    height: 32px;
    padding: 4px;
  }
}
</style>
