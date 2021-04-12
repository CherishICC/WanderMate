<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand"><img src="/assets/logo1.png">Wandermate</a>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li> -->
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">All Users</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/addUser" class="nav-link">Add User</router-link>
        </li>
        <li v-if="showGuideBoard" class="nav-item">
          <router-link to="/package" class="nav-link">Packages</router-link>
        </li>
        <li v-if="showGuideBoard" class="nav-item">
          <router-link to="/addPackage" class="nav-link"
            >Add Packages</router-link
          >
        </li>
        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/tours" class="nav-link">
            <font-awesome-icon icon="home" />Home</router-link
          >
        </li>
        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/mytours" class="nav-link">My Bookings</router-link>
        </li>
        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/writeblog" class="nav-link">Write Blog</router-link>
        </li>
        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/allblogs" class="nav-link">All Blogs</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showGuideBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_GUIDE');
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_USER');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>
