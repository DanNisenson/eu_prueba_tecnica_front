<template>
  <v-card class="d-flex align-center justify-space-between mt-1">
    <CheckboxCircle
      class="checkbox"
      :checked="props.task.completed"
      @click="toggleCompletion"
    />

    <v-textarea
      v-if="isEditTitle"
      ref="textarea"
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
    <div
      v-else
      class="task-text text-body-1"
      :class="props.task.completed && 'done-task'"
    >
      {{ newTitle }}
    </div>

    <v-menu location="end">
      <template #activator="activ">
        <MoreIcon v-bind="activ.props" class="mr-2" @click="openTaskActions" />
      </template>
      <ActionsMenu
        :uuid="props.task.uuid"
        :tag="props.task.tag"
        @selectTag="setTag"
      />
    </v-menu>
  </v-card>
</template>

<script setup lang="ts">
import { useTasksStore } from "../stores/taskStore";
import CheckboxCircle from "./icons/CheckboxCircle.vue";
import MoreIcon from "./icons/MoreIcon.vue";

interface Task {
  task: {
    id: number;
    uuid: string;
    title: string;
    tag: string;
    completed: boolean;
  };
}

const tasksStore = useTasksStore();
const props = withDefaults(defineProps<Task>(), {
  task: { id: -1, uuid: "", title: "", color: "", completed: false },
});
// eslint-disable-next-line vue/no-setup-props-destructure
let newTitle = props.task.title;
const textarea = ref();
const isEditTitle = ref(false);

const openTaskActions = () => {
  isEditTitle.value = true;
  textarea.value.focus();
  textarea.value.select();
};

const setTag = (tag: string) => {
  console.log(tag);
};

const handleEnter = () => {
  textarea.value.blur();
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

<style scoped>
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
}
.done-task {
  text-decoration: line-through;
}
</style>
