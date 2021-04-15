<template>
  <div id="AddPackage" class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
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
        <label for="package_name">Package Name</label>
        <input
          type="text"
          class="form-control"
          id="package_name"
          required
          v-model="pack_info.package_name"
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
          v-model="pack_info.location"
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
          v-model="pack_info.days"
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
          v-model="pack_info.cost"
          name="cost"
        />
      </div>

      <button @click="savePackage" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPackage">Add</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserService from '../services/user.service';
import $ from 'jquery';

export default {
  name: 'AddPackage',
  data() {
    return {
      pack_info: {
        id: null,
        username: '',
        package_name: '',
        location: '',
        days: '',
        cost: '',
        // published: false
      },
      submitted: false,
      validated:'',
    };
  },
  mounted() {
    const ref = this;
    $('.dropdown-toggle').dropdown();
    $('.dropdown-menu a').click(function () {
      $('#dropdownMenuButton').text($(this).text());
      // $('#AddPackage').__vue__.setRole($(this).text());
      ref.setRole($(this).text());
    });
  },
  methods: {
    savePackage() {
      var data = {
        // to be changed
        imgUrl:this.pack_info.imgUrl,
        userId:this.userId,
        username: this.pack_info.username,
        package_name: this.pack_info.package_name,
        location: this.pack_info.location,
        days: this.pack_info.days,
        cost: this.pack_info.cost,
      };
      // console.log(data);
      UserService.packagecreate(data)
        .then((response) => {
          this.pack_info.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newPackage() {
      this.submitted = false;
      this.pack_info = {};
    },
  },
  computed: {
    ...mapGetters({username:'auth/getUsername',userId:'auth/getUserId'}),
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
  margin-top: 30px;
}
</style>
