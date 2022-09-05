import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const ChannelCard = ({ channelDetails }) => {
    if(!channelDetails)return null
    const {
        snippet,
        id: { channelId },
    } = channelDetails;
    return (
        <Link to={`/channel/${channelId}`} className="flex flex-col items-center">
            <div className="m-4 ">
                <LazyLoadImage
                    src={snippet?.thumbnails?.medium?.url}
                    alt="channel"
                    style={{ width: 180, height: 180 }}
                    delayMethod="debounce"
                    className="rounded-full mx-auto"
                />
            </div>
            <div className="flex gap-2 justify-center mt-1 items-center text-sm text-[#e3e3e3] mb-2">
                <p>{snippet?.title}</p> <BsCheckCircleFill />
            </div>
            {channelDetails?.statistics?.subscriberCount && (
                <div className="text-sm text-[#e3e3e3]">
                    <p>
                        {parseInt(
                            channelDetails?.statistics?.subscriberCount
                        ).toLocaleString()}{" "}
                        Subscribers
                    </p>
                </div>
            )}
        </Link>
    );
};

export default ChannelCard;
