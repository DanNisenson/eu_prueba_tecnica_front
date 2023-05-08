<template>
  <v-container class="d-flex justify-center" fill-height>
    <v-sheet color="transparent">
      <v-card
        color="grey-lighten-1 pa-2"
        title="To-Do"
        width="300px"
        elevation="16"
      >
        <Task v-for="task in tasks" :key="task.id" :text="task.title" />
        <NewTask />
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup>
const uri = "http://localhost:8080/v1/task";
const { data } = await useFetch(uri);
const tasks = data.value;
</script>
