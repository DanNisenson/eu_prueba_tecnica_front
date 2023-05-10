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
      <draggable
        v-model="tasks"
        v-bind="dragOptions"
        :disabled="!enabled"
        item-key="id"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="drop"
      >
        <template #item="{ element }">
          <Task :key="element.uuid" :task="element" />
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
import { storeToRefs } from "pinia";
import { useTasksStore } from "../stores/taskStore";

const tasksStore = useTasksStore();

tasksStore.getAllTasks();
const { tasks } = storeToRefs(tasksStore);
tasksStore.$subscribe((mutation, state) => {
  tasks.value = state.tasks;
});

const drop = async () => {
  dragging.value = false;
  const taskList = tasks.value.map((task, i) => {
    return { ...task, id: i };
  });
  await tasksStore.updateAllTasks(taskList);
};

const enabled = ref(true);
const dragging = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});
</script>

<style>
.ghost {
  opacity: 0.5;
}

.not-draggable {
  cursor: no-drop;
}
</style>
