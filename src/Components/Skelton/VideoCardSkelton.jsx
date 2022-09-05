import React from 'react'

const VideoCardSkelton = () => {
    return (
        <div className="w-[260px] bg-[#101010aa] rounded-lg flex flex-col">
            <div className="w-full h-[180px] bg-gray-800" />
            <div className="w-8/12 h-8 bg-gray-800 m-2" />
            <div className="w-10/12 h-6 bg-gray-800 m-2" />
            <div className="w-10/12 h-6 bg-gray-800 m-2" />
            <div className='flex justify-end'>
                <div className="w-6/12 h-6 bg-gray-800 m-2" />
            </div>
        </div>
    )
}

export default VideoCardSkelton