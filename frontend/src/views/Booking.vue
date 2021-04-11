<template>
  <div v-if="currentUser" class="edit-form">
    <h3>Package</h3>
    <form>

      <div class="form-group">
        <label for="username">Guide</label>
        <input type="text" class="form-control" id="username"
          v-model="currentUser.username"
          v-validate="'required|min:3|max:20'"
          name="username"
        />
          <!-- :disabled="validated ? disabled : ''" -->
    
      </div>
      <div class="form-group">
        <label for="package_name">Package</label>
        <input type="text" class="form-control" id="package_name"
          v-model="currentUser.package_name"
          v-validate="'required|min:6|max:40'"
          name="package_name"
        />
          <!-- :disabled="validated ? disabled : ''" -->

      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location"
          v-model="currentUser.location"
          v-validate="'required|min:3|max:30'"   
        />
          <!-- :disabled="validated ? disabled : ''"        -->

      </div>
      <div class="form-group">
        <label for="days">Days</label>
        <input type="number" class="form-control" id="days"
          v-model="currentUser.days"
          name="days"
        />
          <!-- :disabled="validated ? disabled : ''" -->
      </div>

      <div class="form-group">
        <label for="cost">Price</label>
        <input type="number" class="form-control" id="cost"
          v-model="currentUser.cost"
          name="cost"
        />
          <!-- :disabled="validated ? disabled : ''" -->
      </div>

      <div class="form-group">
        <label for="date">Start Date</label>
        <input type="date" class="form-control" id="date"
          v-model="currentUser.start_date"
          name="date"
        />
      </div>

      <div class="form-group">
        <label for="date">End Date</label>
        <input type="date" class="form-control" id="date"
          v-model="currentUser.end_date"
          name="date"
        />
      </div>

    </form>
    
      <button @click="saveBooking" class="btn btn-success">Submit</button>
    <p>{{ message }}</p>
  </div>
  
  <div v-else>
    <br />
    <p>Please click on a Guide...</p>
  </div>
 
</template>

<script>
import UserDataService from '../services/user.service';
// import UserAuthService from '../services/auth.service';
export default {
  name: "booking",
  data() {
    return {
      currentUser: null,
      submitted: false,
      message: ''
    };
  },
  methods: {
    getGuide(id) {
      UserDataService.userPackageList(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveBooking(){
      var data = {
        username: this.booking.username,
        package_name: this.booking.package_name,
        price: this.booking.price,
        guide: this.booking.guide,
        location:this.booking.location,
        start_date: this.booking.start_date,
        end_date: this.booking.end_date,
      };
      console.log(data);
      UserDataService.bookingcreate(data)
        .then(response => {
          this.booking.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getGuide(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>