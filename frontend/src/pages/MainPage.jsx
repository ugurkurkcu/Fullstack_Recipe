import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Error from "../components/Error";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";

const MainPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState([]);
  const [order, setOrder] = useState(undefined);
  const debouncedTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    setIsLoading(true);

    const params = {
      title: debouncedTerm,
      order: order,
    };

    axios
      .get(`http://127.0.0.1:3002/api/recipes`, { params })
      .then((res) => {
        setIsLoading(false);
        setError(null);
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [debouncedTerm, order]);

  return (
    <main className=" flex-1 ml-36 bg-neutral-200 shadow-inner min-h-screen max-sm:ml-24 shadow-gray-400 p-3">
      <section>
        <div className=" bg-white flex gap-3 px-3 p-2 rounded-full items-center overflow-hidden shadow-inner shadow-gray-400">
          <FiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-full outline-none"
            type="text"
          />
        </div>
      </section>

      <section className="mt-5">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <div className=" grid gap-5">
            <div className=" flex flex-row justify-around items-center mb-5">
              <h1 className="text-3xl">
                {data.results}{" "}
                {data.results > 1 ? "Recipes Found" : "Recipe Found"}
              </h1>
              <select
                onChange={(e) => setOrder(e.target.value)}
                value={!order ? "Sort by time" : order}
                className="text-xl p-2 rounded-xl"
              >
                {!order && <option>Sort by time</option>}

                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className=" grid gap-2 grid-cols-1 min-w-[500px] lg:grid-cols-2 2xl:grid-cols-3">
              {data.recipes.map((i, index) => (
                <Card key={index} recipe={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MainPage;
