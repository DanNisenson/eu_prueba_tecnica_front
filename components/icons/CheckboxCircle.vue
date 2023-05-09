<template>
  <svg-icon
    v-if="checked"
    class="icon"
    height="1rem"
    type="mdi"
    :path="pathDone"
  ></svg-icon>
  <svg-icon
    v-else
    class="icon"
    height="1rem"
    type="mdi"
    :path="pathBlank"
  ></svg-icon>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckboxMarkedCircleOutline } from "@mdi/js";
import { mdiCheckboxBlankCircleOutline } from "@mdi/js";

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    checked: { type: Boolean, default: false },
  },
  data() {
    return {
      pathDone: mdiCheckboxMarkedCircleOutline,
      pathBlank: mdiCheckboxBlankCircleOutline,
    };
  },
});
</script>

<style>
.icon {
  cursor: pointer;
  margin: 0 6px;
}
</style>
