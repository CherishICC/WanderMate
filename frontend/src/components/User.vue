<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentUser.title"
        />

      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password"
          v-model="currentUser.password"
        />

      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentUser.phone"
        />

      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentUser.email"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentUser.published ? "Published" : "Pending" }}
      </div>
      
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentUser.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateUser"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentUser.id,
        title: this.currentUser.title,
        password: this.currentUser.password,
        phone: this.currentUser.phone,
        email: this.currentUser.email,
        published: status
      };

      UserDataService.update(this.currentUser.id, data)
        .then(response => {
          this.currentUser.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'The User was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Users" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
