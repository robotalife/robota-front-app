<script>
import VIcon from "vuetify/lib/components/VIcon";
import { initLocalFileLoader } from "@/layouts/create/components/sampleDomainSimulation";
export default {
  name: "FileInput",
  components: {
    VIcon,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: "",
    },
    id: {
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
  },
  data() {
    return {
      file: "",
      dragging: false,
      value: 100,
      bufferValue: 20,
    };
  },
  methods: {
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      const section = e.target.dataset.section;
      const name = e.target.name;
      const next = e.target.dataset.next;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0], name, section, next);
      initLocalFileLoader(files);
      document.querySelector(".vtk").remove();
    },
    onProgress(percent) {
      console.log(percent, "peeeer");
    },
    createFile(file, name, section, next) {
      let config = {
        onUploadProgress(progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          // execute the callback
          if (this.onProgress) this.onProgress(percentCompleted);

          return percentCompleted;
        },
      };

      let collection = {};
      let data = new FormData();
      data.append("File", file);
      data.append("FileType", 1);
      this.$api.project
        .uploadFile(data, this.$store.state?.config.id, config)
        .then((res) => {
          if (next) {
            collection = {
              [section]: {
                [next]: {
                  [name]: res.fileName,
                },
              },
            };
          } else {
            collection = {
              [section]: {
                [name]: res.fileName,
              },
            };
          }
          this.$store.commit("SET_SAVE_CONFIG", collection);
        });
      // if (!file.type.match('vtp.*')) {
      //   // show toast error for file format
      //   this.dragging = false;
      //   return;
      // }

      // if (file.size > 4000000) {
      //   // show toast error for file size
      //   this.dragging = false;
      //   return;
      // }

      this.file = file;
      this.dragging = false;
    },
    removeFile() {
      this.file = "";
    },
  },
};
</script>

<template>
  <div>
    <div v-if="!file">
      <div
        :class="['FileInput p-y-3', dragging ? 'FileInput--over' : '']"
        @dragenter="dragging = true"
        @dragleave="dragging = false"
      >
        <div v-if="!dragging" @drag="onChange">
          <p class="font-14-24 fw-500 g-65 m-0 ta-center">
            Drag & drop or browse
          </p>
          <p class="font-12-16 g-50 fw-500 m-t-1 m-b-0 ta-center">
            Supported Format: VTP (up to 4MB)
          </p>
        </div>
        <div v-else class="d-flex w-1-1 h-1-1 jc-center ai-center">
          <VIcon dark>$upload</VIcon>
        </div>
        <input
          :id="id"
          type="file"
          :name="name"
          :data-section="section"
          :data-next="next"
          @change="onChange"
        />
      </div>
    </div>
    <div v-else class="FileInput--uploaded d-flex">
      <VIcon dark>$file</VIcon>
      <div class="m-l-1 d-flex w-1-1 ai-center">
        <div class="w-1-1">
          <p class="font-14-24 g-100 m-b-1">{{ file.name }}</p>
          <v-progress-linear v-model="value" color="green"></v-progress-linear>
        </div>
        <div class="FileInput__cancel bg-db-05 m-l-1" @click="removeFile">
          <VIcon dark>$cross</VIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.FileInput {
  border-radius: 5px;
  border: 1px dashed $gray-30;
  height: 96px;
  position: relative;

  @include m(over) {
    background-color: #006ef50d;

    // .v-icon__component {
    //   height: 40px;
    //   width: 40px;
    // }
  }

  @include m(uploaded) {
    // .v-icon__component {
    //   height: 40px;
    //   width: 40px;
    // }
  }

  @include e(cancel) {
    height: 24px;
    width: 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    // .v-icon__component {
    //   height: 18px;
    //   width: 18px;
    // }
  }

  input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
