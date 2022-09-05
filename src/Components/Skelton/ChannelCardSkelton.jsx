import React from 'react'

const ChannelCardSkelton = () => {
    return (
        <div className="w-48 h-72 bg-[#101010aa] rounded-lg p-2 flex flex-col items-center">
            <div className="flex justify-center items-center h-[180px]">
                <div className="w-[180px] h-[180px] rounded-full bg-gray-300" />
            </div>
            <div className="w-8/12 h-8 bg-gray-300 m-2" />
            <div className="w-10/12 h-6 bg-gray-300 m-2" />
        </div>
    )
}

export default ChannelCardSkelton