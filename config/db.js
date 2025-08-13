var mongoose = require("mongoose");
// const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Global Plugins
// mongoose.plugin(aggregatePaginate);

mongoose.set("strictQuery", true);

// Connect to DB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`DB : Connected`);
  })
  .catch((err) => {
    console.log(`DB : Error - ${err.message}`);
  });

module.exports = mongoose;
