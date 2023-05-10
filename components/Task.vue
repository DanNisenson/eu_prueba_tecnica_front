<template>
  <v-card
    class="d-flex align-center justify-space-between mt-1 transition min-h-3"
    :class="isEditTitle ? 'make-big' : null"
  >
    <CheckboxCircle
      class="checkbox"
      :checked="props.task.completed"
      @click="toggleCompletion"
    />

    <v-textarea
      v-if="isEditTitle"
      ref="textarea"
      v-model="newTitle"
      class="w-100"
      :class="props.task.completed && 'done-task'"
      bg-color="transparent"
      variant="solo"
      density="compact"
      rows="1"
      auto-grow
      hide-details
      autofocus
      @blur="titleChange"
      @keydown.enter="handleEnter"
    ></v-textarea>
    <div v-else class="task-text" :class="props.task.completed && 'done-task'">
      {{ newTitle }}
    </div>
    <div class="circle mr-2" :class="props.task.tag"></div>
    <v-menu location="end">
      <template #activator="activ">
        <MoreIcon
          v-bind="activ.props"
          class="mr-2"
          @click="isEditTitle = true"
        />
      </template>
      <ActionsMenu
        :uuid="props.task.uuid"
        :tag="props.task.tag"
        @set-tag="setTag"
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

const setTag = (tag: string) => {
  const task = {
    ...props.task,
    tag: tag,
  };
  tasksStore.updateTask(task);
};

const handleEnter = () => {
  textarea.value.blur();
  titleChange();
};

const titleChange = () => {
  isEditTitle.value = false;
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
.task-text {
  user-select: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  padding: 8px 16px;
  letter-spacing: 0.009375em;
}
.transition {
  transition: all 0.4s ease-in-out;
}
.make-big {
  transform: scale(1.02);
}
.done-task {
  text-decoration: line-through;
}
.min-h-3 {
  min-height: 3rem;
}
.circle {
  border-radius: 100%;
  min-height: 1rem;
  min-width: 1rem;
  cursor: pointer;
}
.none {
  background-color: transparent;
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
