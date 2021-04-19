<template>
  <div v-if="!submitted" class="edit-form">
    <h3>Package</h3>
    <form>
      <div class="form-group">
        <label for="guide">Guide</label>
        <input
          type="text"
          class="form-control"
          id="guide"
          v-model="Booking.guide"
          v-validate="'required|min:3|max:20'"
          name="guide"
          :disabled="validated ? disabled : ''"
        />
      </div>
      <div class="form-group">
        <label for="package_name">Package</label>
        <input
          type="text"
          class="form-control"
          id="package_name"
          v-model="Booking.package_name"
          v-validate="'required|min:6|max:40'"
          name="package_name"
          :disabled="validated ? disabled : ''"
        />
      </div>
      <!-- <div class="form-group">
        <label for="rating">Rating</label>
        <input
          type="number"
          class="form-control"
          id="rating"
          v-model="Booking.rating"
          v-validate="'required'"
          name="rating"
        />
      </div> -->
              <div class="min-width-200">
                <span class="bold">Rating :</span>
                <star-rating
                  :rating="Booking.rating"
                  :show-rating="false"
                  :inline="true"
                  :star-size="30"
                ></star-rating>
              </div>
      <div class="form-group">
        <label for="review">Review</label>
        <textarea
          type="text"
          class="form-control"
          id="review"
          v-model="Booking.review"
          v-validate="'required|min:6|max:40'"
          name="review"
        />
      </div>
    </form>

    <button @click="saveBooking" class="btn btn-success">Submit Review</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Booking Successful!</p>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
import { mapGetters } from 'vuex';

export default {
  name: 'Booking',
  data() {
    const minDate = new Date();
    return {
      Booking: {
        id: null,
        packageId:'',
        username: '',
        guide: '',
        package_name: '',
        location: '',
        start_date: '',
        end_date: '',
        Rating: 0,
        review: '',
      },
      Itenary: {
        id:null,
        // userId: null,
        // username: '',
        // package_name: '',
        // location: '',
        // days: 0,
        // cost: 0,
        count: 0,
        // imgUrl:'',
        rating:'',
      },
      packageid:null,
      rating1:0,
      submitted: false,
      message: '',
      validated: '',
      min: minDate,
    };
  },
  methods: {
    getGuide(userId) {
      UserDataService.userBooking(userId)
        .then((response) => {
          this.Booking = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveBooking() {
      var data = {
        userId: this.userId,
        username: this.username,
        guide: this.Booking.username,
        package_name: this.Booking.package_name,
        location: this.Booking.location,
        start_date: this.Booking.start_date,
        end_date: this.Booking.end_date,
        rating: this.Booking.rating,
        review: this.Booking.review,
      };
      UserDataService.bookingupdate(this.Booking._id, data)
        .then((response) => {
          this.Booking.id = response.data.id;
          // console.log(response.data);
          this.submitted = true;
          UserDataService.UserPackageGet(this.Booking.packageId)
            .then((response) => {
            this.Itenary = response.data;
            this.packageid = this.Booking.packageId;
            this.rating1 = this.Itenary.rating;
            // console.log(this.packageid+"   "+this.rating1);
            var data1 =  {
              id: this.Itenary.id,
              username: this.Itenary.username,
              package_name: this.Itenary.package_name,
              location: this.Itenary.location,
              // change rating here
              rating: 3+this.rating1,
              days: this.Itenary.days,
              cost: this.Itenary.cost,
              count: this.Itenary.count+1,
            }
          // console.log(this.packageid);
          UserDataService.packageEditRating(this.packageid,data1)
          .then((response) => {
            this.Booking.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log('err:', e);
          });
          })
          .catch((e) => {
            console.log(e);
          });
          })
          .catch((e) => {
          console.log('err:', e);
        });
    },
  },
  computed: {
    ...mapGetters({ username: 'auth/getUsername', userId: 'auth/getUserId' }),
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
