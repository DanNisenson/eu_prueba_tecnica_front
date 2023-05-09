<template>
  <svg-icon class="icon" height="1rem" type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDelete } from "@mdi/js";

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiDelete,
    };
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}
</style>
