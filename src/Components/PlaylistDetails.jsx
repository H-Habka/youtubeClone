import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/FetchFromAPI";
import Spinner from "./Spinner";
import { useMediaQuery } from "react-responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Videos from "./Videos";
import { BsCheckCircleFill } from "react-icons/bs";
import useErrorMessage from "../utils/useErrorMessage";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState({ one: false, two: false });
  const triggerErrorMessage = useErrorMessage();

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    setLoading({ one: true, two: true });
    fetchFromApi(`playlists?part=snippet&id=${id}`)
      .then((data) => {
        setDetails(data.items[0]);
        setLoading((prev) => ({ ...prev, one: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
    fetchFromApi(`playlistItems?part=snippet&playlistId=${id}`)
      .then((data) => {
        setVideos(data.items);
        setLoading((prev) => ({ ...prev, two: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
  }, [id]);

  if (!details) return;

  const { snippet } = details;

  if (loading.one || loading.two || !details)
    return (
      <div className="w-screen h-[89vh] flex items-center justify-center">
        <Spinner loading={loading.one || loading.two} />
      </div>
    );

  return (
    <div className="min-h-[89vh] w-screen flex flex-col lg:flex-row justify-around px-4">
      <div>
        <div className="">
          <Link to={`/video/${videos[0]?.snippet?.resourceId?.videoId}`}>
            <LazyLoadImage
              src={snippet?.thumbnails?.standard?.url}
              alt="playlist"
              className="w-screen lg:w-[50vw] h-[80vh] sm:h-[90vh] lg:h-[77vh]"
            />
          </Link>
        </div>
        <div className="p-2">
          <p className="font-semibold">{snippet?.title}</p>
          <div className="w-fit ">
            <Link to={`/channel/${snippet?.channelId}`}>
              <div className="flex gap-2 items-center text-gray-500">
                <p>{snippet?.channelTitle}</p>
                <BsCheckCircleFill size={16} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[24vw] lg:max-h-[89vh] lg:overflow-y-auto px-2">
        <Videos
          videos={videos}
          customClassName={`${isLaptop ? "flex flex-col gap-2" : ""}`}
        />
      </div>
    </div>
  );
};

export default PlaylistDetails;
