<template>
  <div id="AddPackage" class="submit-form">
    <div v-if="!submitted">

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="pack_info.username"
          v-validate="'required|min:3|max:20'"
          name="username"
        />
        <div class="invalid-feedback">{{ errors.first("username") }}</div>        
        <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
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
        <div class="invalid-feedback">{{ errors.first("username") }}</div>        
        <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first('username') }}
        </div>
      </div>  
    
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          required
          v-model="pack_info.location"
          v-validate="'required|min:3|max:30'"
          name="location"
        />
        <div class="invalid-feedback">{{ errors.first("username") }}</div>        
        <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first('username') }}
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

      <!-- <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="pack_info.description"
          name="description"
        />
      </div> -->

      <button @click="savePackage" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPackage">Add</button>
    </div>
  </div>
</template>

<script>
// import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service";
import $ from "jquery";
export default {
  name: "addPackage",
  data() {
    return {
      pack_info: {
        id: null,
        username:"",
        package_name: "",
        location: "",
        days:"",
        cost:""
        // published: false
      },
      submitted: false
    };
  },
  mounted(){
    const ref= this;
    $('.dropdown-toggle').dropdown();
     $('.dropdown-menu a').click(function () {
      $('#dropdownMenuButton').text($(this).text());
      // $('#AddPackage').__vue__.setRole($(this).text());
      ref.setRole($(this).text());
    });
  },
  methods: {
    savePackage() {
      var data = {
        username:this.pack_info.username,
        package_name: this.pack_info.package_name,
        location: this.pack_info.location,
        days: this.pack_info.days,
        cost: this.pack_info.cost
      };
      console.log(data);
      UserService.packagecreate(data)
        .then(response => {
          this.pack_info.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // setRole(role){
    //   this.pack_info.roles=role;
    // },
    newPackage() {
      this.submitted = false;
      this.pack_info = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
  margin-top:30px;
}
</style>