<template>
  <v-card class="ml-4 d-flex flex-column text-body-2">
    <div class="ml-3 mt-2 mb-1">Tags</div>
    <v-divider></v-divider>
    <div class="ml-2 my-1 d-flex flex-column">
      <div
        v-for="(tag, index) in tags"
        :key="tag"
        class="pa-1 d-flex align-center"
      >
        <div class="circle mr-2" :class="tags[index]"></div>
        <div>{{ tags[index] }}</div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="ml-1 my-2 d-flex align-center">
      <TrashIcon />
      <div class="mr-2">Delete</div>
    </div>
  </v-card>
</template>

<script setup>
import TrashIcon from "./icons/TrashIcon.vue";

const tags = ["none", "red", "yellow", "green", "blue"];
</script>

<style scoped>
.circle {
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
}
.none {
  background-color: white;
}
.red {
  background-color: #f7b2bd;
}
.yellow {
  background-color: #f2c57c;
}
.green {
  background-color: #cde7be;
}
.blue {
  background-color: #80a1d4;
}
</style>
