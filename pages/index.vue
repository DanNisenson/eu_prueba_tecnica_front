<template>
  <v-container class="d-flex justify-center" fill-height>
    <v-card
      color="grey-lighten-1 pa-2"
      title="To-Do"
      min-width="300px"
      max-width="1000px"
      width="70%"
      elevation="16"
    >
      <Task v-for="task in tasksStore.tasks" :key="task.uuid" :task="task" />
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
import { useTasksStore } from "../stores/taskStore";

const tasksStore = useTasksStore();

if (tasksStore.didFetchFail) {
  setTimeout(() => {
    tasksStore.resetDidFetchFail();
  }, 5000);
}

tasksStore.getAllTasks();
</script>
