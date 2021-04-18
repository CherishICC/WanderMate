<template>
  <div>
    <!-- <div class="search">
      <div class="search-parent">
        <div class="search-bar">
          <b-form-input
            @input="searchLocation()"
            v-model="users.to"
            type="text"
            placeholder="Search by Location"
          ></b-form-input>
        </div>
      </div>
    </div> -->
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
        v-model="details.username"
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
      details:{
        username:'',
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
      console.log("hi");
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
        msg: this.Chat.msg,
      };
      UserDataService.chatcreate(data)
        .then((response) => {
          this.Chat.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log('err:', e);
        });
    },
    searchLocation() {
      UserDataService.GetChatByreceiver(this.details.username)
        .then((response) => {
          console.log(this.details.username);
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
    this.retrieveUsers();
    this.getGuide(this.$route.params.id);
    this.searchLocation();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
