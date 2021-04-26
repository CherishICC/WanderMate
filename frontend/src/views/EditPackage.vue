<template>
  <div v-if="currentUser" class="edit-form">
    <h4>Package</h4>
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
        <label for="package_name">Package Name</label>
        <input
          type="text"
          class="form-control"
          id="package_name"
          required
          v-model="currentUser.package_name"
          v-validate="'required|min:3|max:50'"
          name="package_name"
        />
        <div class="invalid-feedback">{{ errors.first('username') }}</div>
        <div v-if="submitted && errors.has('username')" class="alert-danger">
          {{ errors.first('username') }}
        </div>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          required
          v-model="currentUser.location"
          v-validate="'required|min:3|max:30'"
          name="location"
        />
        <div class="invalid-feedback">{{ errors.first('username') }}</div>
        <div v-if="submitted && errors.has('username')" class="alert-danger">
          {{ errors.first('username') }}
        </div>
      </div>

      <div class="form-group">
        <label for="days">Total Days</label>
        <input
          type="Number"
          class="form-control"
          id="days"
          required
          v-model="currentUser.days"
          name="days"
        />
      </div>

      <div class="form-group">
        <label for="cost">Cost</label>
        <input
          type="Number"
          class="form-control"
          id="cost"
          required
          v-model="currentUser.cost"
          name="cost"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deletePackage">
      Delete
    </button>
    <!-- <p>{{ message }}</p> -->
    <button type="submit" class="badge badge-success" @click="updatePackage">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Package...</p>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
// import UserAuthService from '../services/auth.service';

export default {
  name: 'EditPackage',
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
      UserDataService.packageget(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePackage() {
      UserDataService.packageupdate(this.currentUser._id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = 'Package updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePackage() {
      UserDataService.packagedelete(this.currentUser._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'package' });
          this.message = 'The User was deleted successfully!';
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
