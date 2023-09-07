import React from 'react'

const Inputcard = ({tagname,type,selectedOne, set_selectedOne,errmsg='Enter correct password'}) => {
  return (
    <div className='flex flex-col gap-[2.5px]'>
        <div className='font-thin'>{tagname}</div>
        <div className='flex flex-col gap-[1px]'>
        <input type={type} value={selectedOne} onChange={e => set_selectedOne(e.target.value)} className='px-2 py-[2px] border-[1.5px] border-slate-500 rounded-md w-[200px] focus:bg-gre focus:border-blue-500 transition duration-300'/>
        
        </div>
       

    </div>
  )
}

export default Inputcard