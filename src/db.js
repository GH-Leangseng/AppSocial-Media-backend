const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
mongoose
  .connect(
        //"mongodb+srv://lyleangseng:ssss@cluster0.k8fwhxw.mongodb.net/App?retryWrites=true&w=majority"
        process.env.MONGO_URL // get data from env
  )
  .then((res) => {
    console.log("connected database");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
