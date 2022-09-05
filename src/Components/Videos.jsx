import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";
import { useEffect, createRef, useState } from "react";

const Videos = ({ videos, customClassName, enablePlayMode }) => {
  const [refsArray, setRefsArray] = useState([]);

  useEffect(() => {
    const refs = Array(videos?.length || 1)
      .fill()
      .map((_, idx) => createRef());
    setRefsArray(refs);
  }, [videos]);
  return (
    <div
      className={
        customClassName ||
        `gap-3 grid xs:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xs:w-auto mx-auto pt-8`
      }
    >
      {videos.map((item, idx) => (
        <div key={idx} className="relative">
          {item.id.videoId && (
            <VideoCard refProp={refsArray[idx]} details={item} type="video" enablePlayMode={enablePlayMode} />
          )}
          {item.id.channelId && <ChannelCard channelDetails={item} />}
          {item.id.playlistId && (
            <VideoCard
              refProp={refsArray[idx]}
              details={item}
              type="playList"
              enablePlayMode={enablePlayMode}
            />
          )}
          {typeof item.id === "string" && (
            <VideoCard
              refProp={refsArray[idx]}
              details={item}
              type="video"
              id={item?.snippet?.resourceId?.videoId}
              enablePlayMode={enablePlayMode}

            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Videos;
