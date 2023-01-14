<template>
  <div>
    <v-btn
      fab
      width="60px"
      height="60px"
      :color="color"
      class="ml-4"
      @click.stop="handleShow"
      :style="{ 'box-shadow': isOpen ? '-15px 0px #4F4F4F' : '' }"
    >
      <img
        :src="
          isOpen
            ? getSrc
            : require(`../assets/icons/${iconName.toLowerCase()}.svg`)
        "
        width="24px"
        :alt="`${iconName} Icon`"
      />
    </v-btn>
  </div>
</template>

<script>
import style from "../assets/scss/_variables.scss";

export default {
  name: "FloatButton",
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isOpen: false,
    getSrc: "",
    // default
    color: style.indicatorDefault,
  }),
  watch: {
    isOpen: {
      handler: function (val) {
        if (val) {
          if (this.iconName == "Inbox") {
            this.color = style.indicatorApricot;
          } else {
            this.color = style.indicatorBlue;
          }
          this.getSrc = require(`../assets/icons/${this.iconName.toLowerCase()}-white.svg`);
        } else {
          this.color = style.indicatorDefault;
        }
      },
    },
  },
  methods: {
    handleShow() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
