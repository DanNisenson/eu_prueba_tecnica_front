<template>
  <v-card class="ml-4 d-flex flex-column text-body-2">
    <h4 class="ml-3 mt-2 mb-1">Tags</h4>

    <v-divider></v-divider>
    <div class="mx-2 my-1 d-flex flex-column">
      <button
        v-for="(tag, index) in tags"
        :key="tag"
        class="pa-1 d-flex align-center rounded-pill pointer"
        :class="props.tag === tag ? 'selected' : null"
        @click="setTag(tag)"
      >
        <div class="circle mr-2" :class="tags[index]"></div>
        <div :for="tags[index]" class="pointer">{{ tags[index] }}</div>
      </button>
    </div>

    <v-divider></v-divider>
    <div
      class="ml-1 my-2 d-flex align-center pointer"
      @click="tasksStore.deleteTask(props.uuid)"
    >
      <TrashIcon />
      <div class="mr-2">Delete</div>
    </div>
  </v-card>
</template>

<script setup>
import { useTasksStore } from "../stores/taskStore";
import TrashIcon from "./icons/TrashIcon.vue";
const tasksStore = useTasksStore();

const tags = ["none", "red", "yellow", "green"];
const props = defineProps(["uuid", "tag"]);

const emit = defineEmits(["set-tag"]);
const setTag = (tag) => {
  emit("set-tag", tag);
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.relative {
  position: relative;
}
.circle {
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
}
.selected {
  background-color: #80a2d4b7;
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
</style>
