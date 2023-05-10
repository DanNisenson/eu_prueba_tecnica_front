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
        :key="cardKey"
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
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import { useTasksStore } from "../stores/taskStore";

const tasksStore = useTasksStore();
if (tasksStore.didFetchFail) {
  setTimeout(() => {
    tasksStore.resetDidFetchFail();
  }, 5000);
}
tasksStore.getAllTasks();

let cardKey = 0;

const { tasks } = storeToRefs(tasksStore);
console.log("first", tasks.value, "l");
tasksStore.$subscribe((mutation, state) => {
  console.log("subs", mutation, state);
  tasks.value = state.tasks;
});

const drop = async () => {
  dragging.value = false;
  const taskList = tasks.value.map((task, i) => {
    return { ...task, id: i };
  });
  // tasksStore.$patch({
  //   tasks: taskList,
  // });
  // console.log("drop", taskList);
  await tasksStore.updateAllTasks(taskList);
};

// const tasks = computed({
//   get() {
//     console.log("get", tasksStore.tasks);
//     return tasksStore.tasks;
//   },
//   set(taskList) {
//     const listNewIds = taskList.map((task, i) => {
//       return { ...task, id: i };
//     });
//     console.log("get", listNewIds);
//     tasksStore.updateAllTasks(listNewIds);
//   },
// });

const modTasks = tasks;

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
