<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Location"
          v-model="location"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchLocation"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Available Packages</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.location }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button> -->
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

        <a class="badge badge-warning" :href="'/booking/' + currentUser._id">
          Book
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tour...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';

export default {
  name: 'tours-list',
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      location: '',
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.userPackageListAll()
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

    searchLocation() {
      UserDataService.packagefindByLocation(this.location)
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
</style>
