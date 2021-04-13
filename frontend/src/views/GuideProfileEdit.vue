<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User Details</h4>
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
          :disabled="validated ? disabled : ''"
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
    </form>

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
      submitted: '',
    };
  },
  methods: {
    getGuide(id) {
      UserDataService.guideget(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateGuide() {
      UserDataService.guideupdate(this.currentUser._id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = 'The Guide was updated successfully!';
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
