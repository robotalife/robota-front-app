<script></script>
<template>
  <div class="Store h-1-1 w-1-1 p-x-5 p-y-7">
    <router-view></router-view>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.Store {
  overflow-y: scroll;
  height: 90vh;

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
