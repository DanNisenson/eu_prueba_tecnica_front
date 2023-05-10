<template>
  <v-card class="ml-4 d-flex flex-column text-body-2">
    <h4 class="ml-3 mt-2 mb-1">Tags</h4>
    <v-divider></v-divider>
    <div class="mx-2 my-1 d-flex flex-column">
      <v-btn-toggle v-model="selectedTag" class="d-flex flex-column h-100">
        <div
          v-for="(tag, index) in tags"
          :key="tag"
          class="pa-1 d-flex align-center rounded-pill pointer"
          @click="selectTag(tag)"
        >
          <v-btn>
            <div class="circle mr-2" :class="tags[index]"></div>
            <div>{{ tags[index] }}</div>
          </v-btn>
        </div>
      </v-btn-toggle>
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

const emit = defineEmits(["selectTag"]);
const selectTag = (tag) => {
  emit("selectTag", tag);
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.selected {
  background-color: #80a1d4;
}
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
