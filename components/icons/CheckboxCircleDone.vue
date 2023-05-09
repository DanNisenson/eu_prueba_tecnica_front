<template>
  <svg-icon class="icon" height="1rem" type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckboxMarkedCircleOutline } from "@mdi/js";

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiCheckboxMarkedCircleOutline,
    };
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}
</style>
