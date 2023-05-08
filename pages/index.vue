<template>
  <v-container class="d-flex justify-center" fill-height>
    <v-sheet color="transparent">
      <v-card
        color="grey-lighten-1 pa-2"
        title="To-Do"
        width="300px"
        elevation="16"
      >
        <Task
          v-for="task in tasksStore.tasks"
          :key="task.id"
          :text="task.title"
        />
        <NewTask />
      </v-card>
    </v-sheet>
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
import { useTasksStore } from "../stores/taskStore";

const tasksStore = useTasksStore();

if (tasksStore.didFetchFail) {
  setTimeout(() => {
    tasksStore.resetDidFetchFail();
  }, 5000);
}

tasksStore.getAllTasks();
</script>
