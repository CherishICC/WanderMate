<template>
  <div v-if="!submitted" class="edit-form">
    <h3>Package</h3>
    <form>
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
      </div>

      <div class="form-group">
        <label for="guide">Guide</label>
        <input
          type="text"
          class="form-control"
          id="guide"
          v-model="Booking.username"
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
      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          type="number"
          class="form-control"
          id="rating"
          v-model="Booking.rating"
          v-validate="'required'"
          name="rating"
        />
      </div>
      <div class="form-group">
        <label for="review">Review</label>
        <input
          type="text"
          class="form-control"
          id="review"
          v-model="Booking.review"
          v-validate="'required|min:6|max:40'"
          name="review"
        />
      </div>

    </form>

    <button @click="saveBooking" class="btn btn-success">Book</button>
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
        username: '',
        guide: '',
        package_name: '',
        location: '',
        start_date: '',
        end_date: '',
        rating:'',
        review:''
      },
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
      console.log(data);
      console.log(this.Booking.userId,data);
      UserDataService.bookingupdate(this.Booking._id,data)
        .then((response) => {
          this.Booking.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
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
