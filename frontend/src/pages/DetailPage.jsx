import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImClock, ImSpoonKnife } from "react-icons/im";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://127.0.0.1:3002/api/recipes/${id}`)
      .then((res) => {
        setIsLoading(false);
        setError(null);
        setData(res.data.recipe);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  const handleDelete = () => {
    if (confirm("Are you sure to delete this recipe?"))
      axios
        .delete(`http://127.0.0.1:3002/api/recipes/${id}`)
        .then((res) => {
          toast.success("Recipe deleted successfully");
          navigate("/");
        })
        .catch((err) => toast.error("Something wrong", err.message));
  };

  return (
    <main className=" flex-1 ml-36 bg-neutral-200 shadow-inner min-h-screen max-sm:ml-24 shadow-gray-400 p-3">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="justify-center flex flex-col items-center p-4">
          <div className=" w-full flex justify-between mb-2">
            <Link
              to={-1}
              className=" flex items-center gap-2 shadow-md hover:shadow-gray-600 bg-white  shadow-gray-400 w-fit px-2 py-1 rounded-full hover"
            >
              <IoMdArrowRoundBack />
              <span>Back</span>
            </Link>
            <button
              onClick={handleDelete}
              className=" flex items-center gap-2 shadow-md hover:shadow-gray-600 bg-red-500 text-white  shadow-gray-400 w-fit px-2 py-1 rounded-full hover"
            >
              <span>Delete</span>
              <IoTrashOutline />
            </button>
          </div>

          <div className="w-[60%] grid place-items-center overflow-hidden relative">
            <img className=" rounded-3xl " src={data?.image} alt="" />
            <p className="flex justify-between gap-10 text-md bg-red-600 lg:text-xl text-white px-3 py-1 rounded-xl absolute bottom-3 ring-1 ring-white">
              <span className="flex items-center gap-2">
                <ImSpoonKnife /> {data?.category}
              </span>
              <span className="flex items-center gap-2">
                <ImClock /> {data?.recipeTime}min.
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className=" text-center text-3xl lg:text-4xl font-extrabold py-6">
              {data?.recipeName}
            </h1>

            <div className=" grid grid-cols-1 lg:grid-cols-2 max-w-[1200px] gap-6 ">
              <div className="mt-10">
                <h2 className="text-xl lg:text-2xl mb-4 font-bold text-red-500 ">
                  Ingridients :
                </h2>

                <ul className="w-full h-full gap-3 grid bg-amber-800 bg-opacity-15 rounded-xl p-5 shadow-inner shadow-gray-400">
                  {data?.ingredients?.map((i, index) => (
                    <ol key={index} className=" text-black lg:text-lg">
                      <span className="font-extrabold">•</span> <span>{i}</span>
                    </ol>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-xl lg:text-2xl mb-4 font-bold text-red-500 ">
                  Description :
                </h2>

                <ul className="h-full gap-3 grid bg-amber-800 bg-opacity-15 rounded-xl w-fit p-5 shadow-inner shadow-gray-400">
                  {data?.instructions?.map((i, index) => (
                    <ol key={index} className=" text-black lg:text-lg">
                      <span className="font-extrabold text-red-500">
                        {index + 1}
                      </span>{" "}
                      - <span>{i}</span>
                    </ol>
                  ))}
                </ul>
              </div>
            </div>
            <p className=" text-center mt-10 leading-10 w-full bg-yellow-500 bg-opacity-20 rounded-xl p-5 shadow-inner shadow-gray-400">
              {data?.servingSuggestion}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailPage;
