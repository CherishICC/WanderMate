<template>
  <div id="background">
    <div id="app">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href class="navbar-brand"
          ><img src="../public/logo1(2).png" width="200" height="50"
        /></a>
        <div class="navbar-nav mr-auto">
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
          <li v-if="showGuideBoard" class="nav-item">
            <router-link to="/guidechat" class="nav-link">Chat</router-link>
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/tours" class="nav-link">
              <font-awesome-icon icon="home" />Home</router-link
            >
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/mytours" class="nav-link"
              >My Bookings</router-link
            >
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/writeblog" class="nav-link"
              >Write Blog</router-link
            >
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/allblogs" class="nav-link">All Blogs</router-link>
          </li>
        </div>

        <div class="navbar-nav ml-auto">
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/adminprofile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li v-if="showGuideBoard" class="nav-item">
            <router-link to="/guideprofile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/userprofile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />LogOut
            </a>
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
      </nav>

      <div class="container-fluid">
        <router-view />
      </div>
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

<style scoped>
#app {
  min-height: 100vh;
}

#background {
  background: url(../public/bg1.jpg);
  background-repeat: no-repeat;
  align-items: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
