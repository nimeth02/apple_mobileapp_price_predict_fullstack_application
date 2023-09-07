import React from 'react'

const Itemcard = ({image,changebrand}) => {
  return (
    <div className='p-12' onClick={changebrand}>
    <div className='group py-8 bg-green-500 rounded-md  flex justify-center items-center shadow-lg hover:bg-white hover:border-2 hover:border-green-500'>
        <div className=' flex justify-center items-center'>

        <svg width="60" height="60" viewBox="0 0 69 73" fill="none" xmlns="http://www.w3.org/2000/svg" className=' flex justify-center items-center'>
<path d={image} className='fill-white group-hover:fill-green-500  flex justify-center items-center'/>
</svg>

        </div>
        
    </div>
    </div>
  )
}

export default Itemcard