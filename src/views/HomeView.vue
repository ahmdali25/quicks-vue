<script setup lang="ts"></script>

<template>
  <main>
    <v-speed-dial location="left center" transition="slide-x-reverse-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab v-bind="activatorProps" width="68px" height="68px" color="#2F80ED" icon>
          <img src="@/assets/icons/quicks.svg" width="18px" alt="Quicks Logo" />
        </v-fab>
      </template>

      <v-btn key="1" icon="$success">inbox</v-btn>
      <v-btn key="2" icon="$success">task</v-btn>
    </v-speed-dial>
  </main>
</template>

<style scoped>
.v-fab {
  position: fixed;
  bottom: 50px;
  right: 90px;
}
</style>
