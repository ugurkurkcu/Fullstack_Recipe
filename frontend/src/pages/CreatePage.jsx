import ReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,
      image: `https://picsum.photos/5${Math.floor(Math.random() * 89) + 10}`,
    };
    console.log(newRecipe);
    axios
      .post("http://127.0.0.1:3002/api/recipes", newRecipe)
      .then((res) => {
        toast.success("Recipe added successfully");
        navigate("/");
      })
      .catch((err) => toast.error(`Failed to add recipe ${err.message}`));
  };

  return (
    <main className=" flex-1 pt-24 ml-36 bg-neutral-200 shadow-inner min-h-screen max-sm:ml-24 shadow-gray-400 p-3">
      <form
        onSubmit={handleSubmit}
        className=" max-w-2xl m-auto flex flex-col gap-10"
      >
        <h1 className="text-red-500 text-center text-3xl font-bold">
          Create New Recipe
        </h1>

        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Recipe Title</label>
          <input
            className="rounded-md p-2"
            name="recipeName"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Recipe Category</label>
          <input
            className="rounded-md p-2"
            name="category"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Recipe Time</label>
          <input
            className="rounded-md p-2"
            name="recipeTime"
            type="number"
            required
            min={3}
            max={500}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Ingredients</label>
          <ReactSelect
            onChange={(opts) => {
              const refined = opts.map((opt) => opt.label);

              setIngredients(refined);
            }}
            className="rounded-md"
            isMulti
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">
            Instructions{" "}
            <span className="text-sm font-thin">
              (Be carefull to write in order)
            </span>
          </label>
          <ReactSelect
            onChange={(opts) => {
              const refined = opts.map((opt) => opt.label);

              setInstructions(refined);
            }}
            className="rounded-md"
            isMulti
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className=" font-semibold">Serving Suggestion</label>
          <textarea
            required
            name="servingSuggestion"
            className="rounded-md p-2 max-h-[250px] min-h-[250px]"
          ></textarea>
        </div>

        <div className="flex justify-end gap-5">
          <Link
            to={"/"}
            className=" ring-red-400 text-red-400 ring-1 py-1 px-3 rounded-md hover:bg-gray-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className=" bg-red-400 py-1 px-3 rounded-md text-white hover:bg-red-600"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreatePage;
