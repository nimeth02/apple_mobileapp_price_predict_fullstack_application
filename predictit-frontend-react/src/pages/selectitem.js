import React from 'react'
import Itemcard from '../components/itemcard'

import {dell,hp,apple,chaina,windows,android} from '../assests/images'
import {useNavigate} from 'react-router-dom';
const Selectitem = ({brand,setbrand}) => {
  const navigate =useNavigate()
  const changebrand=()=>{
 navigate('/predictit')
  }
  return (
    <div>
    <div className=' grid grid-cols-3  justify-center py-[10%] mx-[20%]'>
        <Itemcard image={apple} changebrand={changebrand}/>
        <Itemcard image={hp}/>
        <Itemcard image={windows}/>
        <Itemcard image={dell}/>
        <Itemcard image={android}/>    
        <Itemcard image={chaina}/>
    </div>
    </div>
  )
}

export default Selectitem