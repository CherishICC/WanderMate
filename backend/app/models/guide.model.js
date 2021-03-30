module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      password: String,
      description: String,
      phone: String,
      email:String,
      // published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Guide = mongoose.model("guide", schema);
  return Guide;
};