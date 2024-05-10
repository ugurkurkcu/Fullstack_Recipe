const { getData } = require("../utils/getData");
const crypto = require("crypto");
const { setData } = require("../utils/setData");

let data = getData();

exports.getAllRecipes = (req, res) => {
  let recipes = [...data];

  const searchTerm = req.query?.title?.trim().toLowerCase();
  const order = req.query?.order;

  if (searchTerm) {
    recipes = data.filter((i) =>
      i.recipeName.toLowerCase().includes(searchTerm)
    );

    res.status(200).json({
      results: recipes.length,
      recipes: recipes,
    });
  }

  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "Recipes sent successfully",
    results: data.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  res.status(200).json({
    message: "Recipe found",
    recipe: req.recipe,
  });
};

exports.createRecipe = (req, res) => {
  const newRecipe = req.body;

  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({
      message: "Please fill out all requirments",
    });
  }

  newRecipe.id = crypto.randomUUID();

  data.push(newRecipe);

  setData(data);

  res.status(201).json({
    message: "New recipe added successfully",
    recipe: data,
  });
};

exports.deleterecipe = (req, res) => {
  const index = data.findIndex((i) => i.id === req.params.id);

  const newRecipes = data.splice(index, 1);

  setData(data);

  res.status(204).json({
    message: "Recipe deleted successfully.",
  });
};
