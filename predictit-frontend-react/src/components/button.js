import React from 'react'

const Button = ({name,size,onClick}) => {
  return (
    <div className={`text-white px-2 py-[3px] border-2 bg-green-500 rounded-md flex justify-center active:border-green-500 active:bg-white active:text-green-500`+  `w-[500]` } onClick={onClick}>
        <div className=' font-normal text-lg '>
            {name}
        </div>
    </div>
  )
}

export default Button