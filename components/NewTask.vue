<template>
  <v-textarea
    v-if="btnState"
    ref="textarea"
    v-model.trim="title"
    class="mt-3 rounded-xl"
    clearable
    placeholder="Write here"
    variant="solo"
    rows="1"
    hide-details="auto"
    bg-color="grey-lighten-2"
    auto-grow
    no-resize
    @keyup.enter="handlePrimaryAction"
  ></v-textarea>

  <v-btn
    class="mt-3 mb-1"
    rounded="s"
    size="small"
    elevation="1"
    color="grey-darken-2"
    @click="handlePrimaryAction"
    >{{ btnState ? "Add" : "New" }}</v-btn
  >
  <v-btn
    v-if="btnState"
    class="mt-3 mb-1 mx-1"
    rounded="s"
    color="grey-darken-1"
    size="extra-small"
    variant="text"
    @click="closeTextarea"
    ><Xicon
  /></v-btn>
</template>

<script>
import { useTasksStore } from "../stores/taskStore";

export default {
  data() {
    return {
      btnState: false,
      title: "",
    };
  },

  methods: {
    handlePrimaryAction() {
      const tasksStore = useTasksStore();

      if (!this.btnState) {
        this.openTextarea();
      } else {
        tasksStore.addTask(this.title);
        this.$refs.textarea.focus();
        this.title = "";
      }
    },

    openTextarea() {
      this.btnState = true;
    },

    closeTextarea() {
      this.btnState = false;
    },
  },
};
</script>
