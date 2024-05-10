import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className=" flex gap-5 m-3 shadow-inner shadow-gray-400 hover:shadow-gray-500 bg-white p-3 rounded-3xl cursor-pointer">
      <div className=" flex flex-col ml-1 gap-3 justify-center">
        <img
          height={130}
          width={130}
          className=" rounded-lg shadow-lg shadow-gray-500"
          src={recipe.image}
          alt=""
        />
        <p className=" flex items-center gap-2 justify-between px-2">
          <FaRegClock />
          <span className=" font-bold text-zinc-300">
            {recipe.recipeTime} min
          </span>
        </p>
      </div>

      <div className="flex-1 h-[200px] overflow-hidden">
        <div>
          <h1 className=" text-2xl font-bold underline text-nowrap">
            {recipe.recipeName}
          </h1>
          <h2 className=" text-xl">{recipe.category}</h2>
        </div>

        <div className=" mt-4 text-gray-400">
          <h4 className=" mb-2">Ingredients</h4>
          <div className=" line-clamp-4">
            {recipe.ingredients.map((i, index) => (
              <p key={index}>
                <span>•</span> <span>{i}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
