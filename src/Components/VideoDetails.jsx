import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { fetchFromApi } from "../utils/FetchFromAPI";
import ReactPlayer from "react-player";
import Videos from "./Videos";
import Spinner from "./Spinner";
import { useMediaQuery } from "react-responsive";
import Comment from "./Comment";
import useErrorMessage from "../utils/useErrorMessage";
import { createTimeString } from "../utils/timeDestance";
import { AiOutlineClockCircle } from "react-icons/ai";

const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [seeMore, setSeeMore] = useState(true);
  const [loading, setLoading] = useState({
    one: false,
    two: false,
    three: false,
  });
  const [showAllComments, setShowAllComments] = useState(true);
  const { id } = useParams();
  const triggerErrorMessage = useErrorMessage();

  const isLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });



  useEffect(() => {
    setLoading({ one: true, two: true, three: true });
    fetchFromApi(`videos?id=${id}&part=snippet&part=statistics`)
      .then((data) => {
        setLoading((prev) => ({ ...prev, one: false }));
        setVideoDetails(data.items[0]);
      })
      .catch((err) => {
        triggerErrorMessage();
      });
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        setRelatedVideos(data.items);
        setLoading((prev) => ({ ...prev, two: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
    fetchFromApi(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
      .then((data) => {
        setComments(data.items);
        setLoading((prev) => ({ ...prev, three: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
  }, [id]);

  if (loading.one || loading.two || !videoDetails)
    return (
      <div className="w-screen h-[89vh] flex justify-center items-center">
        <Spinner loading={loading} />
      </div>
    );

  const { snippet, statistics } = videoDetails;
  const destance = createTimeString(new Date(), snippet?.publishedAt);

  return (
    <div className="flex flex-col md:flex-row min-h-[89vh]">
      <div className="w-screen md:w-[75vw]  ">
        <div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
            height="75vh"
          />
        </div>
        <div className="p-2">
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full  pr-10">
            <p className="font-semibold md:max-w-[80%]">{snippet?.title}</p>
            <div className="flex gap-4 opacity-80 text-gray-500 text-sm">
              <p>{parseInt(statistics?.viewCount).toLocaleString()} Views</p>
              <p>{parseInt(statistics?.likeCount).toLocaleString()} Likes</p>
            </div>
          </div>
          <div className="mt-2 flex-col md:flex-row flex justify-between gap-10 md:gap-4 md:items-center">
            <div className="w-fit ">
              <Link to={`/channel/${snippet?.channelId}`}>
                <div className="flex gap-2 items-center text-gray-500">
                  <p>{snippet?.channelTitle}</p>
                  <BsCheckCircleFill size={16} />
                </div>
              </Link>
            </div>
            <div className="flex gap-2 pr-10 items-center">
              <p>{destance}</p>
              <AiOutlineClockCircle className="text-[#fc1503]" />
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 border-b-2 overflow-hidden">
          <h2 className="font-semibold text-xl">Description</h2>
          <pre className="text-gray-400 text-sm whitespace-pre-wrap mt-2 p-4">
            {seeMore
              ? snippet?.description.slice(0, 300)
              : snippet?.description}
          </pre>
          <button
            onClick={() => setSeeMore((prev) => !prev)}
            className="hover:underline text-gray-300 hover:text-gray-400 "
          >
            {seeMore ? "See More" : "See Less"}
          </button>
        </div>
        <div className="p-4 bg-[#121212] mt-4">
          <h2 className="text-xl font-bold">Comments</h2>
          {comments
            .slice(0, !showAllComments ? comments.length - 1 : 5)
            .map((comment, idx) => (
              <Comment comment={comment} key={idx} />
            ))}
          <button
            onClick={() => setShowAllComments((prev) => !prev)}
            className="hover:underline text-gray-300 hover:text-gray-400 "
          >
            {showAllComments ? "show All" : "show Less"}
          </button>
        </div>
      </div>
      <div className="md:max-h-[89vh] overflow-y-auto mt-4 md:mt-0">
        {!isLaptop && (
          <h2 className="text-xl font-bold px-4 mb-4">Related Videos</h2>
        )}
        <Videos
          videos={relatedVideos}
          customClassName={`${isLaptop ? "flex flex-col gap-2 ml-2" : ""}`}
        />
      </div>
    </div>
  );
};

export default VideoDetails;
