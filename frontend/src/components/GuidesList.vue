<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Guides List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(guide, index) in guides"
          :key="index"
          @click="setActiveGuide(guide, index)"
        >
          {{ guide.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllGuides">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentGuide">
        <h4>Guide</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentGuide.title }}
        </div>
        <div>
          <label><strong>Password:</strong></label> {{ currentGuide.password }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentGuide.description }}
        </div>
         <div>
          <label><strong>Phone:</strong></label> {{ currentGuide.phone }}
        </div>
         <div>
          <label><strong>Email:</strong></label> {{ currentGuide.email }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentGuide.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/guides/' + currentGuide.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Guide...</p>
      </div>
    </div>
  </div>
</template>

<script>
import GuideDataService from "../services/GuideDataService";

export default {
  name: "guides-list",
  data() {
    return {
      guides: [],
      currentGuide: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveGuides() {
      GuideDataService.getAll()
        .then(response => {
          this.guides = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveGuides();
      this.currentGuide = null;
      this.currentIndex = -1;
    },

    setActiveGuide(guide, index) {
      this.currentGuide = guide;
      this.currentIndex = index;
    },

    removeAllGuides() {
      GuideDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      GuideDataService.findByTitle(this.title)
        .then(response => {
          this.guides = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveGuides();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
