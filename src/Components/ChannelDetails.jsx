import { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/FetchFromAPI";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";
import useErrorMessage from "../utils/useErrorMessage";
import ChannelCardSkelton from "./Skelton/ChannelCardSkelton";
import VideoCardSkelton from "./Skelton/VideoCardSkelton";
const ChannelDetails = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [loading, setLoading] = useState({ one: false, two: false });
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const triggerErrorMessage = useErrorMessage();
  useEffect(() => {
    setLoading({ one: true, two: true });
    fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => {
        setChannelDetails(data?.items[0]);
        setLoading((prevState) => ({ ...prevState, one: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => {
        setVideos(data?.items);
        setLoading((prevState) => ({ ...prevState, two: false }));
      })
      .catch((err) => {
        triggerErrorMessage();
      });
  }, [id]);

  return (
    <div className="min-h-[89vh]">
      <div className="h-[200px] bg-gradient-to-r to-purple-800 via-purple-600 from-blue-700" />
      <div className="mt-[-100px] w-fit mx-auto z-10  min-h-[240px] min-w-[180px] flex justify-center items-center">
        {loading.one ? (
          // <Spinner size={120} loading={loading.one} className="" />
          <ChannelCardSkelton />
        ) : (
          <ChannelCard channelDetails={channelDetails} />
        )}
      </div>
      <div className="mt-8 w-11/12 mx-auto flex justify-center items-center gap-2 flex-col md:flex-row">
        {loading.two ? (
          // <Spinner size={200} loading={loading.two} />
          [1, 2, 3, 4,5].map((item, idx) => (
            <VideoCardSkelton key={idx} />
          ))
        ) : (
          <Videos videos={videos} enablePlayMode={true} />
        )}
      </div>
    </div>
  );
};

export default ChannelDetails;
