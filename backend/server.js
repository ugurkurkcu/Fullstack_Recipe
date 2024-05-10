const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const PORT = 3002;

app.use(express.json());

app.use(cors());

app.use(recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}..`);
});
