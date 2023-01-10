const express = require("express");
const HelpRoute = require("./routes/help.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/help", HelpRoute);

app.listen(3000, async () => {
  console.log("Server is running on 3000!");
});
