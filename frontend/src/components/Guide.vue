<template>
  <div v-if="currentGuide" class="edit-form">
    <h4>Guide</h4>
    <form>

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentGuide.title"
        />

      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password"
          v-model="currentGuide.password"
        />

      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentGuide.description"
        />

      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentGuide.phone"
        />

      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentGuide.email"
        />
      </div>
      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentGuide.published ? "Published" : "Pending" }}
      </div> -->
      
    </form>

    <!-- <button class="badge badge-primary mr-2"
      v-if="currentGuide.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button class="badge badge-danger mr-2"
      @click="deleteGuide"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateGuide"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Guide...</p>
  </div>
</template>

<script>
import GuideDataService from "../services/GuideDataService";

export default {
  name: "guide",
  data() {
    return {
      currentGuide: null,
      message: ''
    };
  },
  methods: {
    getGuide(id) {
      GuideDataService.get(id)
        .then(response => {
          this.currentGuide = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentGuide.id,
        title: this.currentGuide.title,
        password: this.currentGuide.password,
        description: this.currentGuide.description,
        phone: this.currentGuide.phone,
        email: this.currentGuide.email,
        published: status
      };

      GuideDataService.update(this.currentGuide.id, data)
        .then(response => {
          this.currentGuide.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateGuide() {
      GuideDataService.update(this.currentGuide.id, this.currentGuide)
        .then(response => {
          console.log(response.data);
          this.message = 'The Guide was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteGuide() {
      GuideDataService.delete(this.currentGuide.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Guides" });
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
