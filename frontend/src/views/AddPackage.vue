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

      <!-- <div class="dropdown" id="seasonDropdown">
        <label for="dropdownMenuButtonseason" style="margin-right: 30px"
          >Season</label
        >
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButtonseason"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
        Season
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButtonseason">
          <a class="dropdown-item" href="#">Summer</a>
          <a class="dropdown-item" href="#">Winter</a>
          <a class="dropdown-item" href="#">Rainy</a>
        </div>
      </div> -->

      <!-- <div id="container" style="margin: 20px auto 0; width: 270px">
            <label>Select Preferences for Seasons</label>
            <br />
            <ejs-dropdownlist
              v-model="pack_info.season"
              v-validate="'required'"
              ref="seasons"
              :query="Query1"
              :dataSource="seasonData"
              :index="seasonindex"
              :fields="seasonfields"
              :change="onSeasonChange"
              name="season1"
              placeholder="Select a season"
            ></ejs-dropdownlist> -->
      <!-- <div v-if="submitted && errors.has('season1')" class="alert-danger">
              Please select a Season
            </div> -->
      <!-- <div class="padding-top">
              <ejs-dropdownlist
                v-model="user.pref2"
                v-validate="'required'"
                :query="Query2"
                :dataSource="season2Data"
                :index="season2index"
                :fields="season2fields"
                :enabled="season2enabled"
                placeholder="Select a season"
                name="season2"
              ></ejs-dropdownlist>
              <div
                v-if="submitted && errors.has('season2')"
                class="alert-danger"
              >
                Please select a Season
              </div>
            </div> -->
      <!-- </div> -->

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
import { Query } from '@syncfusion/ej2-data';

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
        season: '',
      },
      seasonData: [
        { SeasonName: 'Summer', SeasonId: '1' },
        { SeasonName: 'Winter', SeasonId: '2' },
        { SeasonName: 'Rainy', SeasonId: '3' },
      ],
      season2Data: [
        { Season2Name: 'Winter', SeasonId: '1', Season2Id: '101' },
        { Season2Name: 'Rainy', SeasonId: '1', Season2Id: '102' },
        { Season2Name: 'Summer', SeasonId: '2', Season2Id: '103' },
        { Season2Name: 'Rainy', SeasonId: '2', Season2Id: '104' },
        { Season2Name: 'Summer', SeasonId: '3', Season2Id: '105' },
        { Season2Name: 'Winter', SeasonId: '3', Season2Id: '106' },
      ],
      seasonfields: { value: 'SeasonId', text: 'SeasonName' },
      season2fields: { value: 'Season2Id', text: 'Season2Name' },
      seasonindex: 1,
      season2index: 0,
      Query1: null,
      Query2: null,
      season2enabled: false,
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
        imgUrl: this.pack_info.imgUrl,
        userId: this.userId,
        username: this.username,
        package_name: this.pack_info.package_name,
        location: this.pack_info.location,
        days: this.pack_info.days,
        cost: this.pack_info.cost,
        rating: 5,
        season: this.pack_info.season,
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
    setLocation(location) {
      this.pack_info.location = location;
      if (location == 'Bangalore') {
        this.pack_info.imgUrl = 'https://i.postimg.cc/sDd6dVwY/Bangalore.jpg';
      } else if (location == 'Hyderabad') {
        this.pack_info.imgUrl = 'https://i.postimg.cc/qMThHYnh/Hyderabad.jpg';
      } else if (location == 'Chennai') {
        this.pack_info.imgUrl = 'https://i.postimg.cc/HnRCHFvJ/Chennai.jpg';
      }
    },
    setSeason(season) {
      this.pack_info.season = season;
    },
    newPackage() {
      this.submitted = false;
      this.pack_info = {};
    },
    onSeasonChange() {
      this.Query2 = new Query().where(
        'SeasonId',
        'equal',
        this.$refs.seasons.ej2Instances.value
      );
      this.season2enabled = true;
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
