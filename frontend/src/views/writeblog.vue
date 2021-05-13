<template>
  <div id="AddPackage" class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="pack_info.location"
          v-validate="'required|min:3|max:30'"
          name="location"
        />
      </div>
      <div class="form-group">
        <label for="experience">Experience</label>
        <textarea
          type="text"
          class="form-control"
          id="experience"
          v-model="pack_info.experience"
          v-validate="'required|min:10'"
          name="experience"
        />
      </div>
      <div class="text-center">
        <button @click="savePackage" class="btn btn-success">Submit</button>
      </div>
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
  name: 'writeblog',
  data() {
    return {
      pack_info: {
        id: null,
        username: '',
        location: '',
        experience: '',
      },
      submitted: false,
    };
  },
  mounted() {
    const ref = this;
    $('.dropdown-toggle').dropdown();
    $('.dropdown-menu a').click(function () {
      $('#dropdownMenuButton').text($(this).text());
      ref.setRole($(this).text());
    });
  },
  methods: {
    savePackage() {
      var data = {
        username: this.username,
        location: this.pack_info.location,
        experience: this.pack_info.experience,
      };
      console.log(data);
      UserService.createblog(data)
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
    ...mapGetters({ username: 'auth/getUsername', userId: 'auth/getUserId' }),
  },
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
  margin-top: 30px;
}
</style>
