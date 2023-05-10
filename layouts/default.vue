<template>
  <v-app id="inspire">
    <v-navigation-drawer model-value class="pt-4" color="grey-darken-4" rail>
      <v-avatar size="36px" class="d-block text-center mx-auto mb-9">
        <v-avatar
          v-for="n in 6"
          :key="n"
          :color="`grey-${n === 1 ? 'darken' : 'lighten'}-1`"
          :size="n === 1 ? 36 : 20"
          class="d-block text-center mx-auto mb-9"
        ></v-avatar>
      </v-avatar>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
