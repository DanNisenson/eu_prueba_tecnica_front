<template>
  <v-container class="d-flex justify-center" fill-height>
    <TestDnD />
    <v-card
      color="grey-lighten-1 pa-2"
      title="To-Do"
      min-width="300px"
      max-width="1000px"
      width="70%"
      elevation="16"
    >
      <draggable
        :list="tasksStore.tasks"
        :disabled="!enabled"
        item-key="id"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <Task :key="element ? element.uuid : -1" :task="element" />
        </template>
      </draggable>
      <NewTask />
    </v-card>
  </v-container>
  <v-alert
    v-if="tasksStore.didFetchFail"
    color="warning"
    icon="$warning"
    title="Connection error"
    text="There's been a problem fetching your tasks. Make sure you're connected to the internet."
  ></v-alert>
</template>

<script setup>
import draggable from "vuedraggable";
import { useTasksStore } from "../stores/taskStore";

const tasksStore = useTasksStore();
if (tasksStore.didFetchFail) {
  setTimeout(() => {
    tasksStore.resetDidFetchFail();
  }, 5000);
}
tasksStore.getAllTasks();

const enabled = ref(true);
const dragging = ref(false);
const checkMove = (e) => {
  console.log("move");
  // const newTask = {
  //   ...e.draggedContext.element,
  //   id: e.draggedContext.futureIndex,
  // };
  // tasksStore.updateTask(newTask);
};
</script>
