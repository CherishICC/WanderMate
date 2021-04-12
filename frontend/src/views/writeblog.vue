<template>
  <div id="AddPackage" class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          required
          v-model="pack_info.location"
          name="location"
        />
      </div>
      <div class="form-group">
        <label for="experience">Experience</label>
        <input
          type="text"
          class="form-control"
          id="experience"
          required
          v-model="pack_info.experience"
          name="experience"
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
// import AuthService from "../services/auth.service.js";
import UserService from '../services/user.service';
import $ from 'jquery';

export default {
  name: 'addPackage',
  data() {
    return {
      pack_info: {
        id: null,
        username: '',
        location: '',
        experience: '',
        // published: false
      },
      submitted: false,
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
        username: this.pack_info.username,
        package_name: this.pack_info.package_name,
        location: this.pack_info.location,
        days: this.pack_info.days,
        cost: this.pack_info.cost,
      };
      console.log(data);
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
    // setRole(role){
    //   this.pack_info.roles=role;
    // },
    newPackage() {
      this.submitted = false;
      this.pack_info = {};
    },
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
