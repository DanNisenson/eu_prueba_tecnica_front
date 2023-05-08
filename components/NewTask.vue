<template>
  <v-textarea
    v-if="btnState"
    class="mt-3 rounded-xl"
    clearable
    placeholder="Write here"
    variant="solo"
    rows="1"
    hide-details="auto"
    bg-color="grey-lighten-2"
    auto-grow
    no-resize
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
export default {
  data() {
    return {
      btnState: false,
    };
  },

  methods: {
    handlePrimaryAction() {
      !this.btnState ? this.openTextarea() : 0;
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
