<script>
import HeaderMain from "./components/HeaderMain";
import SideBar from "./components/SideBar";
import Simulator from "./components/Simulator";
export default {
  name: "CreateProject",
  components: {
    HeaderMain,
    SideBar,
    Simulator,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      hasProject: this.$store.state?.config.id ? true : false,
      fetchedData: false,
    };
  },
  computed: {
    projectConfig() {
      return this.$store.state?.config;
    },
  },
  created() {
    this.fetchProject();
  },
  methods: {
    fetchProject() {
      if (this.$route.params.slug) {
        this.$api.project
          .fetchProject(this.$route.params.slug)
          .then((result) => {
            console.log(result, "gee");
            this.hasProject = true;
            this.$store.commit("SET_CONFIG", {
              id: result.id,
              name: result.name,
            });
            this.$store.commit("SET_SAVED_PROJECT_CONFIG", result.configs);
            this.fetchedData = true;
          });
      } else {
        this.$store.commit("SET_NEW_CONFIG", this.$store.state?.sampleConfig);
        this.hasProject = false;
        this.fetchedData = true;
      }
    },
    saveProject(value) {
      if (typeof value === "object") {
        this.errorMessage = value.message;
        this.snackbarColor = value.color;
        this.snackbar = true;
      } else {
        if (!this.$store.state?.config.id) {
          this.$api.project
            .createProject(value)
            .then((result) => {
              this.$store.commit("SET_CONFIG", result);
              this.errorMessage = `The ${value} project, created successfully`;
              this.snackbarColor = "green";
              this.snackbar = true;
              this.hasProject = true;
            })
            .catch((error) => {
              if (error.response.status === 409) {
                this.errorMessage =
                  "A project with same name already exists, please choose different name.";
                this.snackbarColor = "pink";
                this.snackbar = true;
              }
            });
        } else {
          this.$api.project
            .saveProjectConfig(
              this.$store.state?.config.configs,
              this.$store.state?.config.id
            )
            .then(() => {
              this.errorMessage = `The ${this.$store.state?.config.name} config, saved successfully`;
              this.snackbarColor = "green";
              this.snackbar = true;
            });
        }
      }
    },
    changeValues(e) {
      let collection = {};
      const value = e.target.value;
      const section = e.target.dataset.section;
      const name = e.target.name;
      const next = e.target.dataset.next;
      if (next) {
        collection = {
          [section]: {
            [next]: {
              [name]: value,
            },
          },
        };
      } else {
        collection = {
          [section]: {
            [name]: value,
          },
        };
      }
      this.$store.commit("SET_SAVE_CONFIG", collection);
    },
  },
};
</script>

<template>
  <div v-if="fetchedData" class="h-1-1 CreateProject">
    <HeaderMain name="name" :label="hasProject" @clicked="saveProject" />
    <form class="CreateProject__body h-1-1" @change="changeValues">
      <SideBar />
      <v-main class="CreateProject__simulator">
        <Simulator />
      </v-main>
    </form>
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
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.CreateProject {
  @include e(body) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    max-height: 92vh;
  }

  @include e(simulator) {
    background-color: #cccccc;
    max-height: 92vh;

    > .v-main__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
