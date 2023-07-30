const express = require("express");
require("./src/db/conn");
const cors = require("cors");

const router=require("./src/routers/men")

const app = express();

const port = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());


app.use(router);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
