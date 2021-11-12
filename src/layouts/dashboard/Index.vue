<script>
import axios from "axios";
import Header from "./components/Header.vue";
import storage from "@/utils/storage";
export default {
  name: "Index",
  components: {
    Header,
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
  mounted: function () {},
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
    <router-view></router-view>
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
