const { getData } = require("../utils/getData");

const data = getData();

exports.controlId = (req, res, next) => {
  const recipe = data.find((i) => i.id == req.params.id);

  if (!recipe) {
    return next(
      res.status(404).json({
        message: "There is no recipe matching the id you are looking for",
      })
    );
  }

  req.recipe = recipe;

  next();
};
