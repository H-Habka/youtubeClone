import React from "react";
import { Link } from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component'

const Comment = ({ comment }) => {
  if (!comment) return;
  const {
    snippet: {
      topLevelComment: { snippet },
    },
  } = comment;
  return (
    <div className="flex gap-2 items-center m-4">
      <div className="rounded-full w-10 h-10 overflow-hidden">
        <Link
          to={`/channel/${snippet?.authorChannelId?.value}`}
        >
          <LazyLoadImage src={snippet?.authorProfileImageUrl} alt={snippet?.authorDisplayName} />
        </Link>
      </div>
      <div>
        <p className="tfont-semibold">{snippet?.authorDisplayName}</p>
        <p className="text-gray-400">{snippet?.textOriginal.slice(0,100)}</p>
      </div>
    </div>
  );
};

export default Comment;
