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
      <div class="min-width-200">
        <span class="bold">Rating :</span>
        <star-rating
          v-model="Booking.rating"
          v-bind:increment="0.5"
          :show-rating="false"
          :inline="true"
          @rating-selected="setRating"
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
    <p></p>
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
        packageId: '',
        username: '',
        guide: '',
        package_name: '',
        location: '',
        start_date: '',
        end_date: '',
        rating: 0,
        review: '',
      },
      Itenary: {
        id: null,
        count: 0,
        rating: '',
        reviews: [''],
      },
      packageid: null,
      rating1: 0,
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
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveBooking() {
      console.log(this.Booking.packageId);
      UserDataService.UserPackageGet(this.Booking.packageId)
        .then((response) => {
          const average = (array) =>
            array.reduce((a, b) => a + b) / array.length;
          this.Itenary = response.data;
          this.packageid = this.Booking.packageId;
          this.rating1 = this.Itenary.rating;
          this.ratings = this.Itenary.ratings;
          this.reviews = this.Itenary.reviews;
          this.ratings.push(this.Booking.rating);
          this.reviews.push(this.Booking.review);
          var data1 = {
            id: this.Itenary.id,
            rating: average(this.ratings),
            count: this.Itenary.count + 1,
            ratings: this.ratings,
            reviews: this.reviews,
          };
          console.log(data1.ratings);
          console.log(data1.reviews);
          UserDataService.packageEditRating(this.packageid, data1)
            .then((response) => {
              this.Booking.id = response.data.id;
              this.submitted = true;
            })
            .catch((e) => {
              console.log('err:', e);
            });
          var data = {
            userId: this.userId,
            username: this.username,
            guide: this.Booking.guide,
            package_name: this.Booking.package_name,
            location: this.Booking.location,
            start_date: this.Booking.start_date,
            end_date: this.Booking.end_date,
            rating: data1.rating,
            review: this.Booking.review,
          };

          UserDataService.bookingupdate(this.Booking._id, data)
            .then((response) => {
              this.Booking.id = response.data.id;
              this.submitted = true;
            })

            .catch((e) => {
              console.log(e);
            });
            this.$router.push({ name: 'mytours' });
        })
        .catch((e) => {
          console.log('err:', e);
        });
    },
    setRating(rating_in) {
      this.rating = rating_in;
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
