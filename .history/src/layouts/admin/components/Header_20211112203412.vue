<script>
import VBtn from "vuetify/lib/components/VBtn";
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "Header",
  components: {
    VBtn,
    VIcon,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    label: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    saveProject() {
      return this.$emit("clicked", this.projectName);
    },
    changeName(name) {
      this.label = false;
      this.projectName = name;
      this.$store.commit("SET_CONFIG", {
        id: "",
        name: name,
      });
    },
    submitSimulation() {
      this.$api.project
        .executeProject(this.$store.state?.config.id)
        .then(() => {
          return this.$emit("clicked", {
            message: "Simulation submitted successfully",
            color: "green",
          });
        });
    },
  },
};
</script>
<template>
  <div class="d-flex ai-center Header p-x-3 p-y-1 bg-white">
    <div class="d-flex ai-center">
      <router-link to="/">
        <VBtn class="bg-db-10" fab dark depressed>
          <VIcon dark>$arrowLeft</VIcon>
        </VBtn>
      </router-link>
      <p class="g-100 fw-600 font-20-32 m-l-2">Admin Panel</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Header {
  box-shadow: inset 0 -1px 0 0 $dark-blue-10;
  max-height: 64px;

  .v-btn--fab {
    max-height: 48px;
    max-width: 48px;
  }
}
</style>
