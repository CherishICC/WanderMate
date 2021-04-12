<template>
  <div v-if="currentUser" class="edit-form">
    <h4>Guide</h4>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="currentUser.username"
          v-validate="'required|min:3|max:20'"
          name="username"
        />
        <div class="invalid-feedback">{{ errors.first('username') }}</div>
        <div v-if="submitted && errors.has('username')" class="alert-danger">
          {{ errors.first('username') }}
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="text"
          class="form-control"
          id="password"
          v-model="currentUser.password"
          v-validate="'required|min:6|max:40'"
          name="password"
        />
        <div class="invalid-feedback">{{ errors.first('password') }}</div>
        <div v-if="submitted && errors.has('password')" class="alert-danger">
          {{ errors.first('password') }}
        </div>
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="currentUser.phone"
          v-validate="'required|min:10|max:10'"
        />
        <div class="invalid-feedback">{{ errors.first('phone') }}</div>
        <div v-if="submitted && errors.has('phone')" class="alert-danger">
          {{ errors.first('phone') }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentUser.email"
          v-validate="'required|email|max:50'"
          name="email"
        />
      </div>
      <div class="invalid-feedback">{{ errors.first('email') }}</div>
      <div v-if="submitted && errors.has('email')" class="alert-danger">
        {{ errors.first('email') }}
      </div>
      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentUser.published ? "Published" : "Pending" }}
      </div> -->
    </form>

    <!-- <button class="badge badge-primary mr-2"
      v-if="currentUser.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button class="badge badge-danger mr-2" @click="deleteGuide">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateGuide">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Guide...</p>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
// import UserAuthService from '../services/auth.service';
export default {
  name: 'guide',
  data() {
    return {
      currentUser: null,
      updated: false,
      deleted: false,
      message: '',
      submitted:''
    };
  },
  methods: {
    getGuide(id) {
      UserDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // updatePublished(status) {
    //   var data = {
    //     id: this.currentUser.id,
    //     username: this.currentUser.username,
    //     password: this.currentUser.password,
    //     // description: this.currentUser.description,
    //     phone: this.currentUser.phone,
    //     email: this.currentUser.email,
    //     // published: status
    //   };
    //   UserDataService.update(this.currentUser._id, data)
    //     .then(response => {
    //       this.currentUser.published = status;
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    updateGuide() {
      UserDataService.update(this.currentUser._id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = 'The Guide was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteGuide() {
      UserDataService.delete(this.currentUser._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'guide' });
          this.deleted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getGuide(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
