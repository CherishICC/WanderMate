<template>
  <div class="list row">
    <div class="col-md-6">
      <ul class="list-group">
        <li
          class="list-group-item bg-transparent"
          style="border: none"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
        >
          {{ user.from + ' : ' + user.msg }}
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label for="from">From</label>
      <input
        type="text"
        class="form-control"
        id="from"
        v-model="username"
        v-validate="'required|min:3|max:20'"
        name="from"
        :disabled="validated ? disabled : ''"
      />
    </div>
    <div class="form-group">
      <label for="to">To</label>
      <input
        type="text"
        class="form-control"
        id="to"
        v-model="Chat.username"
        v-validate="'required|min:3|max:20'"
        name="to"
        :disabled="validated ? disabled : ''"
      />
    </div>
    <div class="form-group">
      <label for="msg">Message</label>
      <input
        type="text"
        class="form-control"
        id="msg"
        v-model="Chat.msg"
        v-validate="'required|min:10'"
        name="msg"
      />
    </div>
    <button @click="sendChat" class="btn btn-success">Send</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
import { mapGetters } from 'vuex';

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
      users: [],
      currentUser: null,
      submitted: false,
      message: '',
      validated: '',
      currentIndex: -1,
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.userChatAll()
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
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
    // getChat() {
    //   console.log(this.username)
    //   UserDataService.GetChatByreceiver(this.username)
    //     .then((response) => {
    //       this.Chat = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    sendChat() {
      var data = {
        userId: this.userId,
        from: this.username,
        to: this.Chat.guide,
        msg: this.Chat.msg,
      };
      console.log(data);
      UserDataService.chatcreate(data)
        .then((response) => {
          this.Chat.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log('err:', e);
        });
    },
  },
  computed: {
    ...mapGetters({ username: 'auth/getUsername', userId: 'auth/getUserId' }),
  },
  mounted() {
    this.retrieveUsers();
    this.message = '';
    // this.getChat();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
