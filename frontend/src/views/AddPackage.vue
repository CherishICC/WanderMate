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

      <div class="dropdown" id="locationDropdown">
        <label for="dropdownMenuButton" style="margin-right: 30px"
          >Location</label
        >
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Location
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Bangalore</a>
          <a class="dropdown-item" href="#">Hyderabad</a>
          <a class="dropdown-item" href="#">Chennai</a>
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
      },
      submitted: false,
      validated: '',
    };
  },
  mounted() {
    const ref = this;
    $('.dropdown-toggle').dropdown();
    $('.dropdown-menu a').click(function () {
      $('#dropdownMenuButton').text($(this).text());
      ref.setLocation($(this).text());
    });
  },
  methods: {
    savePackage() {
      var data = {
        // to be changed
        imgUrl: this.pack_info.imgUrl,
        userId: this.userId,
        username: this.username,
        package_name: this.pack_info.package_name,
        location: this.pack_info.location,
        days: this.pack_info.days,
        cost: this.pack_info.cost,
        rating: 5,
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
    setLocation(location) {
      this.pack_info.location = location;
      if (location == 'Bangalore') {
        this.pack_info.imgUrl =
          'https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/12/new-seven-wonders-taj-mahal.jpg.rend.hgtvcom.616.462.suffix/1491581548979.jpeg';
      } else if (location == 'Hyderabad') {
        this.pack_info.imgUrl =
          'https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/12/new-seven-wonders-great-wall-of-china.jpg.rend.hgtvcom.616.462.suffix/1491581549051.jpeg';
      } else if (location == 'Chennai') {
        this.pack_info.imgUrl =
          'https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/12/new-seven-wonders-christ-the-redeemer.jpg.rend.hgtvcom.616.462.suffix/1491581548898.jpeg';
      }
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
  max-width: 300px;
  margin: auto;
  margin-top: 30px;
}
</style>
