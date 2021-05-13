<template>
  <div class="inner">
    <div class="col-md-6">
      <ul class="list-group">
        <li
          class="list-group-item bg-transparent"
          style="border: none"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
        >
          <span class="text-primary">{{ user.from }}</span>
          {{ ' : ' + user.msg }}
        </li>
      </ul>
    </div>
    <hr />
    <div class="col-md-6">
      <p>To : {{ details.username }}</p>
      <div class="form-group form-inline">
        <label for="msg"></label>
        <input
          type="text"
          class="form-control"
          id="msg"
          v-model="Chat.msg"
          v-validate="'required|min:1'"
          name="msg"
        />
        <button @click="sendChat" class="btn btn-success">Send</button>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script
  type="text/javascript"
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
></script>
<script type="text/javascript">
// function googleTranslateElementInit() {
//   new google.translate.TranslateElement(
//     {
//       pageLanguage: 'it',
//       includedLanguages: 'de,en,es,fr,it',
//       gaTrack: true,
//       gaId: 'UA-XXXXXXXX-X',
//     },
//     'google_translate_element'
//   );
// }
</script>
<script>
import UserDataService from '../services/user.service';
import { mapGetters } from 'vuex';
// const translate = require('google-translate-api');
// import Vue from 'vue';
// import VueTranslate from 'vue-translate-plugin';
// Vue.use(VueTranslate);
export default {
  name: 'Chat',
  data() {
    return {
      Chat: {
        id: null,
        username: '',
        from: '',
        to: '',
        msg: '',
      },
      details: {
        username: '',
        userId: '',
      },
      users: [],
      currentUser: null,
      submitted: false,
      message: '',
      validated: '',
      currentIndex: -1,
    };
  },
  methods: {
    // changeLanguage() {
    //   translate('Ik spreek Engels', { to: 'en' })
    //     .then((res) => {
    //       console.log('hello');
    //       console.log(res.text);
    //       console.log(res.from.language.iso);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
    retrieveUsers() {
      console.log('hi');
      UserDataService.userChatAll()
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    getGuide(id) {
      UserDataService.userPackageList(id)
        .then((response) => {
          this.details = response.data;
          this.searchChat();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    sendChat() {
      var data = {
        userId: this.userId,
        from: this.username,
        to: this.details.username,
        toUserId: this.details.userId,
        msg: this.Chat.msg,
      };
      console.log(data);
      UserDataService.chatcreate(data)
        .then((response) => {
          this.Chat.id = response.data.id;
          this.submitted = true;
          this.searchChat();
        })
        .catch((e) => {
          console.log('err:', e);
        });
    },
    async searchChat() {
      UserDataService.GetChatByreceiver(this.details.userId)
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    ...mapGetters({ username: 'auth/getUsername', userId: 'auth/getUserId' }),
  },
  mounted() {
    // this.changeLanguage();
    this.getGuide(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.inner {
  margin-left: 250px;
}
</style>
