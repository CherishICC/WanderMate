<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          required
          v-model="tutorial.location"
          name="location"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          number
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="number">Number of days</label>
        <input
          type="number"
          min="1"
          max="15"
          center
          class="form-control"
          id="number"          
          required
          v-model="tutorial.number"
          name="number"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          min="1"
          class="form-control"
          id="price"
          required
          v-model="tutorial.price"
          name="price"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        location: "",
        description: "",
        number: "",
        price:"",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        location: this.tutorial.location,
        description: this.tutorial.description,
        number: this.tutorial.number,
        price: this.tutorial.price
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
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