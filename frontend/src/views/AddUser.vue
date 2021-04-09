<template>
  <div id="AddGuide" class="submit-form">
    <div v-if="!submitted">

      <div class="form-group">
        <label for="username">Name</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="guide.username"
          v-validate="'required|min:3'"
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
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="guide.password"
          v-validate="'required|min:6'"
          name="password"
        />
        <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first('password') }}
            </div>
      </div>

      <div class="dropdown" id="roleDropdown">
        <label for="dropdownMenuButton" style="margin-right:30px;">Roles</label>
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Roles
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">admin</a>
          <a class="dropdown-item" href="#">guide</a>
          <a class="dropdown-item" href="#">user</a>
        </div>
      </div>

      <!-- <div v-if="guide.roles=='guide'" class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="guide.description"
          name="description"
        />
      </div> -->

      <!-- <div v-if="guide.roles=='guide'" class="form-group">
        <label for="location">Location</label>
        <input
          class="form-control"
          id="location"
          required
          v-model="guide.location"
          name="location"
        />
      </div> -->
     

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          required
          v-model="guide.phone"
          name="phone"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="guide.email"
          v-validate="'required|email|max:50'"
          name="email"
        />
        <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
        </div>
      </div>

      <button @click="saveGuide" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newGuide">Add</button>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/auth.service.js";
import $ from "jquery";

export default {
  name: "addGuide",
  data() {
    return {
      guide: {
        id: null,
        username: "",
        // description: "",
        roles:"",
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
      // $('#AddGuide').__vue__.setRole($(this).text());
      ref.setRole($(this).text());
    });
  },
  methods: {
    saveGuide() {
      var data = {
        username: this.guide.username,
        password: this.guide.password,
        // description: this.guide.description,
        roles:[this.guide.roles],
        phone: this.guide.phone,
        email: this.guide.email,
      };
      console.log(data);
      AuthService.create(data)
        .then(response => {
          this.guide.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    setRole(role){
      this.guide.roles=role;
    },
    newGuide() {
      this.submitted = false;
      this.guide = {};
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
