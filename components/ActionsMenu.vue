<template>
  <v-card class="ml-4 d-flex flex-column text-body-2">
    <legend class="ml-3 mt-2 mb-1">Tags</legend>

    <v-divider></v-divider>
    <div class="mx-2 my-1 d-flex flex-column">
      <div
        v-for="(tag, index) in tags"
        :key="tag"
        class="pa-1 d-flex align-center pointer relative"
        :class="selectedTag(tag)"
        @click="setTag(tag)"
      >
        <input
          v-model="radioTags"
          :id="tags[index]"
          type="radio"
          name="tags"
          :value="tags[index]"
          :checked="props.tag === tag ? tag : null"
        />
        <div class="circle mr-2" :class="tags[index]"></div>
        <label :for="tags[index]" class="pointer">{{ tags[index] }}</label>
      </div>
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

const props = defineProps(["uuid", "tag"]);

const tags = ["none", "red", "yellow", "green"];

const selectedTag = (tag) => (tag === props.tag ? "selected" : null);

const emit = defineEmits(["set-tag"]);
const setTag = (tag) => {
  emit("set-tag", tag);
};
</script>

<style scoped>
input[type="radio"] {
  appearance: none;
  border-radius: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
input[type="radio"]:checked {
  background-color: #80a2d4b6;
}
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
