import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const Spinner = ({size=150, color="#fc1503", loading=false,className=""}) => {
  return (
    <PuffLoader 
        color={color}
        size={size}
        loading={loading}
        className={className}
    />
  )
}

export default Spinner