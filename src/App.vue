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
          transition="slide-x-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" :color="color" width="68px" height="68px" fab>
              <img
                src="./assets/icons/quicks.svg"
                width="18px"
                alt="Quicks Logo"
              />
            </v-btn>
          </template>
          <FloatButton @handleClick="handleDialog" icon-name="Inbox" />
          <FloatButton icon-name="Task" />
        </v-speed-dial>
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          hide-overlay
          width="737px"
        >
          <v-card
            style="overflow-x: hidden !important"
            width="737px"
            :style="{
              height: isExtraLargeView ? '734px' : '500px',
            }"
          >
            <v-slide-x-transition>
              <v-card
                v-if="!isShowMessage"
                style="overflow-x: hidden !important"
                width="737px"
                :style="{
                  height: isExtraLargeView ? '734px' : '500px',
                }"
              >
                <v-row justify="center" class="pt-4">
                  <v-col cols="11">
                    <input type="text" placeholder="Search" />
                  </v-col>
                </v-row>
                <v-row v-if="loading" class="text-center">
                  <v-col cols="12">
                    <div class="progress">
                      <v-progress-circular
                        indeterminate
                        :size="60"
                        :width="7"
                        color="#C4C4C4"
                      ></v-progress-circular>
                      <p class="mt-6">Loading Chats ...</p>
                    </div>
                  </v-col>
                </v-row>
                <div v-else v-for="(message, index) in messages" :key="index">
                  <div>
                    <v-row
                      @click="handleShowMessage(message)"
                      class="message mt-6"
                    >
                      <v-col cols="1">
                        <div class="wrapper mt-2">
                          <div class="circle fill-white left">
                            <img
                              class="icon"
                              width="11px"
                              src="./assets/icons/person.svg"
                              alt="Person Icon"
                            />
                          </div>
                          <div class="circle filled right">
                            <img
                              class="icon"
                              width="11px"
                              src="./assets/icons/person-white.svg"
                              alt="Person Icon"
                            />
                          </div>
                        </div>
                      </v-col>
                      <v-col>
                        <v-row>
                          <v-col
                            :class="
                              message.group.length <= 25
                                ? 'col-4 mr-n4'
                                : message.group.length <= 30
                                ? 'col-6 mr-n12'
                                : 'col-8'
                            "
                            ><span class="message__group"
                              >{{ message.group }}
                              {{ message.group.length }}</span
                            ></v-col
                          >
                          <v-col
                            ><span class="message__date">{{
                              formatDate(message.date)
                            }}</span></v-col
                          >
                        </v-row>
                        <p class="message__user mt-n4">{{ message.user }} :</p>
                        <p class="mt-n5">{{ message.message }}</p>
                      </v-col>
                    </v-row>
                    <v-row
                      v-if="!loading && !lastIndex(index)"
                      justify="center"
                    >
                      <hr class="divider" />
                    </v-row>
                  </div>
                </div>
              </v-card>
            </v-slide-x-transition>
            <v-slide-y-transition>
              <v-card
                v-if="isShowMessage"
                style="overflow-x: hidden !important"
                width="737px"
                :style="{
                  height: isExtraLargeView ? '734px' : '500px',
                }"
              >
                <v-app-bar color="white">
                  <v-btn @click="handleCloseMessage" icon>
                    <img src="./assets/icons/arrow-back.svg" alt="Arrow Icon" />
                  </v-btn>

                  <v-row>
                    <v-col
                      ><p class="group-name mt-4">{{ openedMessage.group }}</p>
                      <p class="group-participants mt-n4">
                        {{ openedMessage.participants }} participants
                      </p></v-col
                    >
                  </v-row>

                  <v-spacer></v-spacer>

                  <v-btn @click="handleCloseMessage" icon>
                    <img src="./assets/icons/close.svg" alt="Close Icon" />
                  </v-btn>
                </v-app-bar>

                <v-card-text class="box">
                  <v-row
                    v-for="(message, index) in chat_messages"
                    :key="message.id"
                  >
                    <v-col v-if="message.user == userLogin">
                      <div class="mt-3">
                        <v-btn icon>
                          <img src="./assets/icons/more.svg" alt="Icon More" />
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="8">
                      <div class="box__user" :class="index > 0 ? 'mt-n5' : ''">
                        {{ message.user == userLogin ? "You" : message.user }}
                      </div>
                      <div
                        class="box__message"
                        :style="{
                          'background-color':
                            message.user == userLogin ? '#EEDCFF' : '#FCEED3',
                        }"
                      >
                        <p>{{ message.text }}</p>
                        <p>{{ message.hour }}</p>
                      </div>
                    </v-col>
                    <v-col v-if="message.user != userLogin">
                      <div class="mt-3 ml-n4">
                        <v-btn icon>
                          <img src="./assets/icons/more.svg" alt="Icon More" />
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import moment from "moment";
import style from "./assets/scss/_variables.scss";
import FloatButton from "./components/FloatButton.vue";

export default {
  name: "App",
  components: {
    FloatButton,
  },
  data: () => ({
    isExtraLargeView: false,
    color: style.primaryBlue,
    direction: "left",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    showQuick: true,
    offset: true,
    dialog: false,
    loading: true,
    messages: [
      {
        group: "109220-Naturalization",
        date: new Date("2022-03-25"),
        user: "Cameron Phillips",
        message: "Please check this out!",
        isGroup: true,
        participants: 3,
      },
      {
        group:
          "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
        date: new Date(),
        user: "Ellen",
        message: "Hey, please read.!",
        isGroup: true,
        participants: 3,
      },
      {
        group: "8405-Diana SALAZAR MUNGUIA",
        date: new Date(),
        user: "Cameron Phillips",
        message:
          "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
        isGroup: true,
        participants: 3,
      },
    ],
    isShowMessage: false,
    openedMessage: {},
    chat_messages: [
      {
        user: "Cameron Phillips",
        text: "Please check this out!",
        hour: "19:32",
      },
      {
        user: "Ahmad Ali Azhary",
        text: "No worries. It will be completed ASAP. I've asked him yesterday.",
        hour: "19:32",
      },
      {
        user: "Mary Hilda",
        text: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
        hour: "19:32",
      },
      {
        user: "Ahmad Ali Azhary",
        text: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
        hour: "19:32",
      },
    ],
    userLogin: "Ahmad Ali Azhary",
  }),
  methods: {
    handleResize() {
      this.isExtraLargeView = window.innerWidth > 1440;
    },
    formatDate(date) {
      return moment(date).format("MM/DD/YY, h:mm");
    },
    handleDialog() {
      this.dialog = !this.dialog;
      if (this.isShowMessage) {
        this.isShowMessage = false;
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    lastIndex(index) {
      if (this.messages.length - (index + 1) === 0) {
        return true;
      } else {
        return false;
      }
    },
    handleShowMessage(message) {
      this.openedMessage = message;
      this.isShowMessage = true;
    },
    handleCloseMessage() {
      this.isShowMessage = false;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");
@import "./assets/scss/_variables.scss";

* {
  font-family: "Lato", sans-serif;
}

#app {
  background-color: $bg-dark;

  .v-speed-dial {
    position: fixed;
    bottom: 27px !important;
    right: 24px !important;
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .v-dialog {
    position: absolute;
    bottom: 85px;
    right: 0;
  }

  input {
    border: 1px solid #828282;
    border-radius: 5px;
    width: 100%;
    padding: 6px 58px;
    background-image: url("./assets/icons/search.svg");
    background-size: 16px;
    background-position: 580px 10px;
    background-repeat: no-repeat;
  }

  ::placeholder {
    color: #333333;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #333333;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #333333;
  }

  .message {
    padding-left: 29px;
    cursor: pointer;

    &__group {
      color: #2f80ed;
      font-weight: bold;
    }

    &__user {
      color: #4f4f4f;
      font-weight: bold;
    }

    &__date {
      font-size: 13px;
    }
  }

  .wrapper {
    width: 51px;
    position: relative;

    .circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      vertical-align: middle;
    }

    .filled {
      background-color: #2f80ed;
    }

    .fill-white {
      background-color: #e0e0e0;
    }

    .left {
      position: absolute;
      left: 0;
    }

    .right {
      position: absolute;
      right: 0;
    }
  }

  .divider {
    border: 1px solid #828282;
    width: 88%;
  }

  .group-name {
    color: #2f80ed;
  }

  .group-participants {
    font-size: 12px;
  }

  .box {
    padding-top: 10px;
    padding-left: 29px;

    &__message {
      background: #fceed3;
      border-radius: 5px;
      padding: 10px;
    }

    &__user {
      color: #e6a443;
      font-weight: bold;
    }
  }
}
</style>
