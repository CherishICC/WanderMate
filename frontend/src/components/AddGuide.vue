<template>
  <div class="submit-form">
    <div v-if="!submitted">
      
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="guide.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="guide.password"
          name="password"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="guide.description"
          name="description"
        />
      </div>

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
          type="text"
          class="form-control"
          id="email"
          required
          v-model="guide.email"
          name="email"
        />
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
import GuideDataService from "../services/GuideDataService";

export default {
  name: "add-guide",
  data() {
    return {
      guide: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveGuide() {
      var data = {
        title: this.guide.title,
        password: this.guide.password,
        description: this.guide.description,
        phone: this.guide.phone,
        email: this.guide.email,
      };

      GuideDataService.create(data)
        .then(response => {
          this.guide.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
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
}
</style>
