import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { fetchFromApi } from "../utils/FetchFromAPI";
import Spinner from "./Spinner";
import { store } from "../store";
import useErrorMessage from "../utils/useErrorMessage";
import { MdOutlineDesignServices } from 'react-icons/md'


const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const category = store((state) => state.category);
  const triggerErrorMessage = useErrorMessage()
  useEffect(() => {
    setIsLoading(true);
    fetchFromApi(`search?part=snippet&q=${category}`)
      .then((res) => {
        setVideos(res.items);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          triggerErrorMessage()
        }
      });
  }, [category]);
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:h-[89vh] md:border-r-2 md:border-white z-10">
        <Sidebar />
        <div className="flex gap-2 items-center px-2">
          <MdOutlineDesignServices color="#f31503" size={28}/>
          <p className="whitespace-nowrap px-1 text-sm">Designed by H-Habka</p>
        </div>
      </div>
      <div className=" p-2 md:h-[88vh] overflow-y-auto flex-1">
        <div className="font-semibold text-xl">
          <span>{category}</span> <span className="text-[#f31503]">Videos</span>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Spinner loading={isLoading} size={200} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Videos enablePlayMode={true} videos={videos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
