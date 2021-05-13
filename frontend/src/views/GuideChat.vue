<template>
  <div class="inner">
    <div class="col-md-6">
      <ul class="list-group">
        <li
          class="list-group-item bg-transparent"
          style="border: none"
          :class="{ active: index == currentIndex }"
          v-for="(chat, index) in chats"
          :key="chat._id"
        >
          <span class="text-primary">{{ chat.from }}</span>
          {{ ' : ' + chat.msg }}
        </li>
      </ul>
    </div>
    <hr />
    <div class="col-md-6">
      <div class="form-group form-inline">
        <label for="to">To :</label>
        <b-form-select
          v-model="toUserId"
          :options="options"
          @input="retrieveChats"
        >
        </b-form-select>
      </div>
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
        <button
          @click="sendChat"
          class="btn btn-success"
          :disabled="toUserId === ''"
        >
          Send
        </button>
        <p>{{ message }}</p>
      </div>
    </div>
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
        toUserId: '',
      },
      toUserId: '',
      users: [],
      chats: [],
      currentUser: null,
      submitted: false,
      message: '',
      validated: '',
      currentIndex: -1,
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.userListAll()
        .then((response) => {
          this.users = response.data;
          // console.log(this.users);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getChat(id) {
      UserDataService.userPackageList(id)
        .then((response) => {
          this.Chat = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveChats() {
      UserDataService.guideChatAll(this.toUserId)
        .then((response) => {
          this.chats = response.data;
          console.log(this.chats);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    sendChat() {
      const toName = this.users.find((item) => item._id === this.toUserId)
        .username;
      var data = {
        userId: this.userId,
        from: this.username,
        to: toName,
        msg: this.Chat.msg,
        toUserId: this.toUserId,
      };
      UserDataService.guidechatcreate(data)
        .then((response) => {
          this.Chat.id = response.data.id;
          this.submitted = true;
          this.retrieveChats();
        })
        .catch((e) => {
          console.log('err:', e);
        });
    },
    removeAllUsers() {
      UserDataService.packagedeleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchUsername() {
      UserDataService.packagefindByUsername(this.package_name)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    ...mapGetters({ username: 'auth/getUsername', userId: 'auth/getUserId' }),
    options() {
      const arr = [
        { value: '', text: 'Please select an option', disabled: true },
      ];
      this.users.forEach((item) => {
        arr.push({ value: item._id, text: item.username });
      });
      return arr;
    },
  },
  mounted() {
    this.retrieveUsers();
    this.retrieveChats();
    this.message = '';
    // this.getChat(this.$route.params.id);
    // console.log(this.$route.params.id);
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
