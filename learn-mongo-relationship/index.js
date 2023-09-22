const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relationship")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  addresses: [
    {
      _id: false,
      city: String,
      country: String,
      street: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// const addUser = async () => {
//   const user = new User({
//     name: "John Doe",
//   });

//   user.addresses.push({
//     city: "New York",
//     country: "USA",
//     street: "123 Main St",
//   });

//   // await user.save();
//   console.log(user);
// };

// addUser();

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    city: "Bandung",
    country: "Indonesia",
    street: "Bintaro",
  });

  await user.save();
  console.log(user);
};

// addAddress("6502a105e74618f8d1aac420");
