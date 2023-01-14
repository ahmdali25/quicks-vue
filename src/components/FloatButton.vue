<template>
  <div>
    <v-btn
      fab
      width="60px"
      height="60px"
      :color="color"
      class="ml-4"
      @click.stop="handleShow"
      :style="isOpen ? 'box-shadow: -15px 0px #4F4F4F' : ''"
    >
      <img
        :src="
          isOpen
            ? getSrc
            : require(`../assets/icons/${this.iconName.toLowerCase()}.svg`)
        "
        width="24px"
        :alt="`${iconName} Icon`"
      />
    </v-btn>
  </div>
</template>

<script>
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
    color: "#F2F2F2",
  }),
  watch: {
    isOpen: {
      handler: function (val) {
        if (val) {
          if (this.iconName == "Inbox") {
            this.color = "#F8B76B";
          } else {
            this.color = "#8785FF";
          }
          this.getSrc = require(`../assets/icons/${this.iconName.toLowerCase()}-white.svg`);
        } else {
          this.color = "#F2F2F2";
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
