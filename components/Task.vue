<template>
  <v-card class="d-flex pl-3 py-1 mt-3" elevation="1" color="grey-lighten-2">
    <input id="scales" type="checkbox" name="scales" />
    <label class="px-2" for="scales">{{ props.text }}</label>
  </v-card>
</template>

<script setup lang="ts">
interface Text {
  text: string;
}
const props = defineProps<Text>();
</script>
