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
          v-model="Booking.username"
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
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="Booking.location"
          v-validate="'required|min:3|max:30'"
        :disabled="validated ? disabled : ''"       
        />
      </div>
      <div class="form-group">
        <label for="days">Days</label>
        <input
          type="number"
          class="form-control"
          id="days"
          v-model="Booking.days"
          name="days"
        :disabled="validated ? disabled : ''"
        />
      </div>

      <div class="form-group">
        <label for="cost">Price</label>
        <input
          type="number"
          class="form-control"
          id="cost"
          v-model="Booking.cost"
          name="cost"
        :disabled="validated ? disabled : ''"
        />
      </div>

      <div class="form-group">
        <label for="date">Start Date</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="Booking.start_date"
          name="date"
        />
      </div>

      <div class="form-group">
        <label for="date">End Date</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="Booking.end_date"
          name="date"
        />
      </div>
    </form>

    <button @click="saveBooking" class="btn btn-success">Submit</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Booking Successful!</p>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';

export default {
  name: 'Booking',
  data() {
    return {
      Booking: {
        id: null,
        username: '',
        guide: '',
        package_name: '',
        location: '',
        start_date: '',
        end_date: '',
      },
      submitted: false,
      message: '',
    };
  },
  methods: {
    getGuide(id) {
      UserDataService.userPackageList(id)
        .then((response) => {
          this.Booking = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveBooking() {
      var data = {
        username: this.Booking.username,
        package_name: this.Booking.package_name,
        guide: this.Booking.guide,
        location: this.Booking.location,
        start_date: this.Booking.start_date,
        end_date: this.Booking.end_date,  
      };
      console.log(data);
      UserDataService.bookingcreate(data)
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
