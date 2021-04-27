export default class Itinerary {
  constructor(
    userid,
    username,
    package_name,
    location,
    days,
    cost,
    imgUrl,
    rating
  ) {
    this.userid = userid;
    this.username = username;
    this.package_name = package_name;
    this.location = location;
    this.days = days;
    this.cost = cost;
    this.imgUrl = imgUrl;
    this.rating = rating;
  }
}
