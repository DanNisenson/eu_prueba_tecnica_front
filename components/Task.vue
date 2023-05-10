<template>
  <v-card class="d-flex align-center justify-space-between mt-1">
    <CheckboxCircle
      class="checkbox"
      :checked="props.task.completed"
      @click="toggleCompletion"
    />
    <v-textarea
      v-if="isEditTitle"
      ref="input"
      v-model="newTitle"
      class="task-textarea"
      :class="props.task.completed && 'done-task'"
      variant="solo"
      density="compact"
      rows="1"
      auto-grow
      hide-details
      @blur="titleChange"
      @keydown.enter="handleEnter"
    ></v-textarea>
    <div v-else class="task-text" :class="props.task.completed && 'done-task'">
      {{ newTitle }}
    </div>

    <TrashIcon class="mr-2" @click="isEditTitle = !isEditTitle" />
  </v-card>
</template>

<script setup lang="ts">
import TrashIcon from "./icons/TraschIcon.vue";
import { useTasksStore } from "../stores/taskStore";
import CheckboxCircle from "./icons/CheckboxCircle.vue";

interface Task {
  task: {
    id: number;
    uuid: string;
    title: string;
    color: string;
    completed: boolean;
  };
}

const tasksStore = useTasksStore();
const props = withDefaults(defineProps<Task>(), {
  task: { id: -1, uuid: "", title: "", color: "", completed: false },
});
// eslint-disable-next-line vue/no-setup-props-destructure
let newTitle = props.task.title;
const input = ref();
const isEditTitle = ref(false);

const editTitle = () => {
  isEditTitle.value = !isEditTitle.value;
};

const handleEnter = () => {
  input.value.blur();
  titleChange();
};

const titleChange = () => {
  const newTask = {
    ...props.task,
    title: newTitle,
  };
  tasksStore.updateTask(newTask);
};

const toggleCompletion = () => {
  const newTask = {
    ...props.task,
    completed: !props.task.completed,
  };
  tasksStore.updateTask(newTask);
};
</script>

<style>
.task-textarea {
  outline: none;
  width: 100%;
}
.task-text {
  user-select: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  padding: 8px 16px;
  letter-spacing: 0.009375em;
}
.done-task {
  text-decoration: line-through;
}
</style>
