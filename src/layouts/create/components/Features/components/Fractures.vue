<script>
import FileInput from '@/components/input/FileInput.vue';
export default {
  name: 'Fractures',
  components: {
    FileInput,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <p class="font-14-24 g-100 m-0">Load Fractures From File</p>
    <FileInput class="m-t-1" />
    <p class="font-14-24 g-100 m-t-4 m-x-0 m-b-0">
      load Fracture Generator Output
    </p>
    <FileInput class="m-t-1" />
  </div>
</template>
