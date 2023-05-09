<template>
  <v-card
    class="d-flex align-center justify-space-between px-3 py-1 mt-3"
    elevation="1"
    color="grey-lighten-2"
  >
    <div>
      <input id="scales" type="checkbox" :name="title" />
      <label class="px-2" :for="title">{{ props.title }} </label>
    </div>
    <TrashIcon
      class="text-h1 ml-auto"
      @click="tasksStore.deleteTask(props.uuid)"
    />
  </v-card>
</template>

<script setup lang="ts">
import TrashIcon from "./TraschIcon.vue";
import { useTasksStore } from "../stores/taskStore";

interface Title {
  title: string;
  uuid: string;
}
const props = defineProps<Title>();

const tasksStore = useTasksStore();
</script>
