<template>
  <v-app>
    <v-main>
      <v-container>
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="#2F80ED"
              width="68px"
              height="68px"
              dark
              fab
            >
              <img
                src="./assets/icons/quicks.svg"
                width="18px"
                alt="Quicks Logo"
              />
            </v-btn>
          </template>
          <FloatButton icon-name="Inbox" />
          <FloatButton icon-name="Task" />
        </v-speed-dial>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FloatButton from "./components/FloatButton.vue";

export default {
  name: "App",
  components: {
    FloatButton,
  },
  data: () => ({
    direction: "left",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-x-reverse-transition",
    showQuick: true,
  }),
};
</script>

<style lang="scss">
#app {
  background-color: #262626;
}

.v-speed-dial {
  position: fixed;
  bottom: 27px !important;
  right: 24px !important;
}
</style>
