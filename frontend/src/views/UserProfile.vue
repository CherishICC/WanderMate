<template>
  <div class="container">
    <p>
      <strong>Username:</strong>
      {{ currentUser.username }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Roles:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
    <a class="badge badge-warning" :href="'/user/' + currentUser.id"> Edit </a>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>
<style>
.container {
  margin: auto;
  margin-top: 30px;
  margin-left: 300px;
}
</style>
