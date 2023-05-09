<template>
  <v-card class="d-flex align-center justify-space-between py-2 mt-1">
    <CheckboxCircle
      class="checkbox"
      :checked="props.task.completed"
      @click="toggleCompletion"
    />
    <textarea
      ref="input"
      v-model="newTitle"
      class="input"
      :class="props.task.completed && 'text-decoration-line-through'"
      resize="false"
      readonly
      @blur="titleChange"
      @keydown.enter="handleEnter"
      @dblclick="editTitle"
      @input="autoResize"
    ></textarea>
    <TrashIcon class="mr-2" @click="tasksStore.deleteTask(props.task.uuid)" />
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
const isEditTitle = ref(true);

function autoResize() {
  input.value.style.height = "auto";
  input.value.style.height = input.value.scrollHeight + "px";
}

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
.input {
  user-select: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  resize: none;
  height: 1.5rem;
}
</style>
