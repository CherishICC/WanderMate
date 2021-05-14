<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first('username') }}
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              v-model="user.phone"
              v-validate="'required|min:10|max:10'"
              type="text"
              class="form-control"
              name="phone"
            />
            <div v-if="submitted && errors.has('phone')" class="alert-danger">
              {{ errors.first('phone') }}
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first('password') }}
            </div>
          </div>

          <!-- <div id="container" style="margin: 20px auto 0; width: 270px">
            <label>Select Preferences for Seasons</label>
            <br />
            <ejs-dropdownlist
              v-model="user.pref1"
              v-validate="'required'"
              ref="seasons"
              :query="Query1"
              :dataSource="seasonData"
              :index="seasonindex"
              :fields="seasonfields"
              :change="onSeasonChange"
              name="season1"
              placeholder="Select a season"
            ></ejs-dropdownlist>
            <div v-if="submitted && errors.has('season1')" class="alert-danger">
              Please select a Season
            </div>
            <div class="padding-top">
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
            </div>
          </div> -->
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
import { Query } from '@syncfusion/ej2-data';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
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
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          console.log(this.user);
          this.$store.dispatch('auth/register', this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
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
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css';
#container .padding-top {
  padding-top: 35px;
}
</style>
