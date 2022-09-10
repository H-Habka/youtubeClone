import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createTimeString } from "../utils/timeDestance";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRef, useState } from "react";
import { BiSlideshow } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

import {
  demoThumbnailUrl,
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "../utils/constants";
import { useEffect } from "react";

const VideoCard = ({ details, type, id, refProp, enablePlayMode }) => {
  let ID;
  if (id) {
    ID = id;
  } else if (type === "video") {
    ID = details.id.videoId;
  } else {
    ID = details.id.playlistId;
  }
  const { snippet } = details;
  const [isHoverd, setIsHoverd] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const dimensions = useRef({
    offsetLeft: 0,
    containerWidth: 0,
    itemWidth: 0,
    containerOffsetLeft: 0,
  });
  const mouseEnterHandler = () => {
    setIsHoverd(true);
  };
  const mouseLeaveHandler = () => {
    setIsHoverd(false);
  };

  useEffect(() => {
    if (
      dimensions?.current?.containerWidth !==
      refProp?.current?.parentElement?.parentElement?.clientWidth
    ) {
      dimensions.current = {
        ...dimensions.current,
        containerWidth:
          refProp?.current?.parentElement?.parentElement?.clientWidth,
      };
    }
    if (
      dimensions?.current?.offsetLeft !==
      refProp?.current?.parentElement?.offsetLeft
    ) {
      dimensions.current = {
        ...dimensions.current,
        offsetLeft: refProp?.current?.parentElement?.offsetLeft,
      };
    }
    if (dimensions?.current?.itemWidth !== refProp?.current?.clientWidth) {
      dimensions.current = {
        ...dimensions.current,
        itemWidth: refProp?.current?.clientWidth,
      };
    }
    if (
      dimensions?.current?.containerOffsetLeft !==
      refProp?.current?.parentElement?.parentElement?.offsetLeft
    ) {
      dimensions.current = {
        ...dimensions.current,
        containerOffsetLeft:
          refProp?.current?.parentElement?.parentElement?.offsetLeft,
      };
    }
  }, [isHoverd, refProp]);

  const isLeftElement =
    dimensions?.current?.offsetLeft - dimensions?.current?.containerOffsetLeft <
    dimensions?.current?.itemWidth;
  const isRightElement =
    dimensions?.current?.offsetLeft - dimensions?.current?.containerOffsetLeft >
    dimensions?.current?.containerWidth - 2 * dimensions?.current?.itemWidth;
  useEffect(() => {
    setPlayMode(false);
    let timeout = setTimeout(() => {
      if (isHoverd) {
        setPlayMode(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isHoverd]);

  const destance = createTimeString(new Date(), snippet?.publishedAt);

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{
        maxWidth: snippet?.thumbnails?.medium?.width || 320,
      }}
      className={`mx-auto transition-all duration-700 
          ${
            enablePlayMode && playMode && type === "video"
              ? "scale-150 z-50 absolute "
              : ""
          }
          ${
            enablePlayMode && isLeftElement
              ? " origin-left "
              : enablePlayMode && isRightElement
              ? "origin-right"
              : ""
          } 
      `}
      ref={refProp}
    >
      <Link className="relative" to={ID ? `/${type}/${ID}` : demoVideoUrl}>
        {enablePlayMode && playMode && type === "video" ? (
          <div
            className="bg-black"
            style={{
              width: "100%",
              height: snippet?.thumbnails?.medium?.height || 180,
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${ID}`}
              width="100%"
              height={snippet?.thumbnails?.medium?.height || 180}
              playing={true}
            />
          </div>
        ) : (
          <>
            <LazyLoadImage
              src={snippet?.thumbnails?.medium?.url || demoThumbnailUrl}
              alt={type}
              style={{
                height: snippet?.thumbnails?.medium?.height || 180,
              }}
              delayMethod="debounce"
              className="z-10"
            />
            <div
              className={`h-full w-full absolute top-0 left-0 bg-[#1e1e1edd] transition-all duration-300 ${
                isHoverd ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={` h-full w-full flex justify-center items-center gap-2 absolute top-0 left-0 transition-all duration-500 ${
                isHoverd ? "opacity-100" : "opacity-0"
              }`}
            >
              {type === "video" ? (
                <>
                  <p className="font-bold">Watch Now</p>
                  <BiSlideshow size={20} color="#fc1503" />
                </>
              ) : (
                <>
                  <FaPlay size={20} />
                  <p className="font-bold">Play All</p>
                </>
              )}
            </div>
            {enablePlayMode && (
              <div
                className={` h-full w-full flex justify-start items-end absolute top-0 left-0 transition-all duration-500 ${
                  isHoverd ? "opacity-100" : "opacity-0"
                }`}
              >
                {type === "video" ? (
                  <p className="px-2 text-[#fc1503] w-full ">
                    Keep Hovering to play
                  </p>
                ) : null}
              </div>
            )}
          </>
        )}
      </Link>
      <div className="bg-[#1e1e1e] px-1 min-h-[140px] pt-4 flex flex-col justify-between">
        <div>
          <Link to={ID ? `/${type}/${ID}` : demoVideoUrl}>
            <p className="font-semibold">
              {snippet?.title.slice(0, 40) || demoVideoTitle}
            </p>
          </Link>
          <div className="w-fit">
            <Link
              to={
                snippet?.channelId
                  ? `/channel/${snippet?.channelId}`
                  : demoChannelUrl
              }
            >
              <p className="flex gap-2 items-center text-gray-500 text-sm">
                {snippet?.channelTitle.slice(0, 28) || demoChannelTitle}{" "}
                <BsCheckCircleFill size={12} />
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-end text-xs p-2">
          <div className="flex gap-2 items-center group">
            <p className="group-hover:text-[#fc1503]">{destance}</p>
            <AiOutlineClockCircle className="text-[#fc1503] group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
