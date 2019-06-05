const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const PORT = process.env.PORT || 3001;

const expressWs = require("express-ws")(app);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/users", userRouter);

app.get("/", async (req, res) => {
  res.json({ msg: "Server is running" });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
