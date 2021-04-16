<template>
  <div>
    <p class="ex1">My Bookings</p>
    <div class="search">
      <div class="search-parent">
        <div class="search-bar">
          <b-form-input
            @input="searchLocation()"
            v-model="location"
            type="text"
            placeholder="Search by Location"
          ></b-form-input>
        </div>
      </div>
    </div>
    <div class="list row">
      <div class="col-md-6">
        <ul class="list-group">
          <li
            class="list-group-item bg-transparent"
            style="border: none"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
          >
            {{ user.location }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentUser">
          <h4>User</h4>
          <div>
            <label><strong>Username:</strong></label> {{ currentUser.username }}
          </div>
          <div>
            <label><strong>Guide:</strong></label> {{ currentUser.guide }}
          </div>
          <div>
            <label><strong>Package:</strong></label> {{ currentUser.package_name }}
          </div>
          <div>
            <label><strong>Location:</strong></label> {{ currentUser.location }}
          </div>
          <div>
            <label><strong>Start Date:</strong></label>
            {{ currentUser.start_date }}
          </div>
          <div>
            <label><strong>End Date:</strong></label> {{ currentUser.end_date }}
          </div>
          
          <div v-if="review">
            <a class="badge badge-warning" :href="'/booking/' + currentUser._id">
            Review
          </a>
          </div>
          
        </div>
        <div v-else>
          <br />
          <p>Please click on a Booking...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
import { mapGetters } from 'vuex';

export default {
  name: 'mybooking',
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      location: '',
      review:'',
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.userBookingAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
      var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      console.log(this.currentUser.end_date);
      console.log(currentDateWithFormat);
      if (this.currentUser.end_date <= currentDateWithFormat) {    
           this.review = true;   
       }else {    
           this.review = false    
       } 
    },

    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchLocation() {
      UserDataService.bookingfindByLocation(this.location)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // CompareDate() {    

    //   if (this.currentUser.start_date > this.currentUser.end_date) {    
    //        this.review = true;   
    //    }else {    
    //        this.review = false    
    //    }    
    // },    
  },
  computed: {
    ...mapGetters({username:'auth/getUsername'}),
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
p.ex1 {
  margin-top: 25px;
  font-size: 30px;
  margin-left: 375px;
}
</style>
<style scoped lang="scss">
@import '/styles/main.scss';
</style>
