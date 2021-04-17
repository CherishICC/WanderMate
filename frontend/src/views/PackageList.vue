<template>
  <div>
    <p class="ex1">Packages List</p>
    <div class="search">
      <div class="search-parent">
        <div class="search-bar">
          <b-form-input
            @input="searchUsername"
            v-model="package_name"
            type="text"
            placeholder="Search by Package"
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
            {{ user.package_name }}
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
            <label><strong>Package:</strong></label>
            {{ currentUser.package_name }}
          </div>
          <div>
            <label><strong>Location:</strong></label> {{ currentUser.location }}
          </div>
          <div>
            <label><strong>Days:</strong></label> {{ currentUser.days }}
          </div>
          <div>
            <label><strong>Cost:</strong></label> {{ currentUser.cost }}
          </div>

          <a class="badge badge-warning" :href="'/package/' + currentUser._id">
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Package...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
export default {
  name: 'PackageList',
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      username: '',
      package_name: '',
      location: '',
    };
  },
  methods: {
    retrieveUsers() {
      console.log(this.username);
      UserDataService.packagegetbyusername(this.username)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
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
  mounted() {
    this.retrieveUsers();
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
  margin-left: 330px;
}
</style>
<style scoped lang="scss">
@import '/styles/main.scss';
</style>
