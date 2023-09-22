const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/tweet_db")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  content: String,
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const addUser = async (name, age) => {
//   const user = new User({
//     name: name,
//     age: age,
//   });

//   console.log(user);
//   await user.save();
//   addTweet("Hello World", ["Hello", "World"], user._id);
// };

// addUser("Muhammad Fauzan Baru", 18);

// const addTweet = async (content, tags, userId) => {
//   console.log(userId);
//   const tweet = new Tweet({
//     content: content,
//     tags: tags,
//     user: userId,
//   });

//   // console.log(tweet);
//   await tweet.save();
// };

// addTweet("Hello World", ["Hello", "World"], "6502c8a40f2114d619f73729");

Tweet.find()
  .populate("user", "name")
  .then((tweet) => {
    console.log(tweet);
  });
