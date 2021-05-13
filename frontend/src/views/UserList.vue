<template>
  <div>
    <p class="ex1">User List</p>
    <div class="search">
      <div class="search-parent">
        <div class="search-bar">
          <b-form-input
            @input="searchUsername"
            v-model="username"
            type="text"
            placeholder="Search by Username"
          ></b-form-input>
        </div>
      </div>
    </div>
    <div class="list row">
      <div class="col-md-6">
        <ul class="list-group">
          <li
            class="list-group-item bg-transparent"
            style="border: none"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
          >
            {{ user.username }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentUser">
          <h4>User</h4>
          <div>
            <label><strong>Username:</strong></label> {{ currentUser.username }}
          </div>
          <div>
            <label><strong>Phone:</strong></label> {{ currentUser.phone }}
          </div>
          <div>
            <label><strong>Email:</strong></label> {{ currentUser.email }}
          </div>
          <div>
            <label><strong>Role:</strong></label>
            {{ this.currentRole }}
          </div>
          <a class="badge badge-warning" :href="'/admin/' + currentUser._id">
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Click on a User</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';

export default {
  name: 'users-list',
  data() {
    return {
      users: [],
      allRoles: [],
      currentUser: null,
      currentIndex: -1,
      username: '',
      validated: '',
      currentRole: '',
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveRoles() {
      UserDataService.getAllRoles()
        .then((response) => {
          this.allRoles = response.data;
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
      // const toName = this.allRoles.find((allRoles)=>allRoles._id===this.currentUser.roles).name;
      // console.log(this.allRoles[0]._id);
      // console.log(this.currentUser.roles[0]);
      if (this.allRoles[0]._id == this.currentUser.roles[0]) {
        this.currentRole = 'user';
      } else if (this.allRoles[0]._id == this.currentUser.roles[1]) {
        this.currentRole = 'guide';
      } else {
        this.currentRole = 'admin';
      }
    },

    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchUsername() {
      UserDataService.findByUsername(this.username)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUsers();
    this.retrieveRoles();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

p.ex1 {
  margin-top: 25px;
  font-size: 30px;
  margin-left: 400px;
}
</style>
<style scoped lang="scss">
@import '/styles/main.scss';
</style>
