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
    <p>
      <strong>Phone:</strong>
      {{ currentUser.phone }}
    </p>
    <strong>Roles:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
    <a class="badge badge-warning" :href="'/user/' + currentUser.id">
      Edit
    </a>
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
