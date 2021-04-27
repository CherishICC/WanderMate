<template>
  <div>
    <div class="search">
      <div class="pad-15-hor pad-15-ver search-parent">
        <div class="search-bar">
          <b-form-input
            @input="searchLocation()"
            v-model="location"
            type="text"
            placeholder="Search by Location"
          ></b-form-input>
          <span class="search-icon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <div>
          <b-form-select
            @input="sort()"
            v-model="search.filter"
            :options="options"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid grid-list-md">
      <div class="row">
        <div
          class="col-md-6 card"
          v-for="(user, index) in users"
          :key="index"
        >
          <div
            class="card-inner"
            @mouseover="show_hover(true, index)"
            @mouseout="show_hover(false, 0)"
          >
            <img class="card-img" :src="user.imgUrl" />

            <div
              class="card-bottom pad-15-hor"
              v-show="!hover_flag || active_id != index"
            >
              <div class="min-width-160">
                <span class="bold">Ratings:</span>
                <star-rating
                  :rating="user.rating"
                  :show-rating="false"
                  :inline="true"
                  :star-size="17"
                ></star-rating>
              </div>
              <div class="max-width-160">
                <span class="bold">{{ user.package_name }}</span>
              </div>
            </div>

            <div
              :class="{ 'card-hover': 1 }"
              v-show="hover_flag && active_id == index"
            >
              <span
                @click="make_active(index)"
                :class="{ green: check_active(index) }"
              ></span>
              <h5>Location : {{ user.location }}</h5>
              <h6>Guide : {{ user.username }}</h6>
              <h6>Days : {{ user.days }}</h6>
              <h6>Price : {{ user.cost }}</h6>
              <div class="row">
                <a class="btn btn-warning" :href="'/booking/' + user._id">
                  Book
                </a>

                <a class="btn btn-primary" :href="'/chat/' + user._id">
                  Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/user.service';
export default {
  name: 'tours',
  data() {
    return {
      hover_flag: false,
      wonders_data_actual: [],
      wonders_data: [],
      active_id: 0,
      users: [],
      currentUser: null,
      currentIndex: -1,
      location: '',
      username: '',
      options: [
        { value: null, text: 'Sort By', disabled: true },
        { value: 'a', text: 'Rating' },
        { value: 'b', text: 'Cost' },
      ],
      search: { filter: null, text: '' },
    };
  },
  methods: {
    show_hover(flag, active_id) {
      this.hover_flag = flag;
      this.active_id = active_id;
    },
    retrieveUsers() {
      UserDataService.userPackageListAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    searchLocation() {
      UserDataService.packagefindByLocation(this.location)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    sort() {
      //console.log(this.search.filter);
      this.search.filter == 'b'
        ? this.users.sort(function (a, b) {
            return b.cost - a.cost;
          })
        : this.users.sort(function (a, b) {
            return b.rating - a.rating;
          });
    },
    check_active(id) {
      var flag = false;
      this.wonders_data_actual.map(function (wonder) {
        if (wonder.id == id) {
          flag = wonder.active_like;
        }
      });
      return flag;
    },
    make_active(id) {
      this.likes.hit++;
      this.wonders_data_actual = this.wonders_data_actual.map(function (
        wonder
      ) {
        if (wonder.id == id) {
          wonder.active_like = !wonder.active_like;
          wonder.active_like ? wonder.likes++ : wonder.likes--;
        }

        return wonder;
      });
      var inside = this;

      inside.likes.count = 0;
      this.wonders_data_actual.map(function (wonder) {
        inside.likes.count += wonder.likes;
      });
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

p.ex1 {
  margin-top: 25px;
  font-size: 30px;
  margin-left: 330px;
}
.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
<style scoped lang="scss">
@import '/styles/main.scss';
</style>
