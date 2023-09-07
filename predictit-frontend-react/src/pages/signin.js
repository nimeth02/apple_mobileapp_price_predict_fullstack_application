import React from 'react'
import Inputcard from '../components/inputcard'
import Button from '../components/button'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const Signin = ({authed,setauthed}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [block, setblock] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errmsg, seterrmsg] = useState('');
  
  const navigate = useNavigate();

  const onsignin =async ()=>{
    const response =await  fetch("http://127.0.0.1:5000/user/signin", {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'email':email,
        'password':password 
      }),
    })
    let res=await response.json()
    console.log(res.err,response.status)
    if(response.status == 200){
      console.log('user sign ined')
      seterrmsg('')
      setauthed(true)
      navigate('/select');
    }
    else{
      seterrmsg(res.error)
    }
  }

  const onsignup =async ()=>{
    const response =await  fetch("http://127.0.0.1:5000/user/signup", {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'name':name,
        'email':email,
        'password':password 
      }),
    })
    let res=await response.json()
    console.log(response,response.status)
    if(response.status == 201){
      
      setblock(false)
      setpassword('')
      seterrmsg('')
    }
    else{
      seterrmsg(res.error)
    }
    
  }

  // console.log(block)
  const changeblock=()=>{
    setblock(!block)
  }
  return (
    block == false ? 
    <div className='flex justify-center flex-col items-center pt-[10%] gap-4'>
      <div className='text-green-500 text-xl font-semibold'>Login</div>
        <div className='Card shadow py-8 px-12 rounded-md flex flex-col gap-6'>
            <Inputcard tagname={'Email'} type={'email'} selectedOne={email} set_selectedOne={setemail}/>
            <Inputcard tagname={'Password'} type={'password'} selectedOne={password} set_selectedOne={setpassword}/>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
              <div className='text-sm font-thin' onClick={changeblock}>
              don't have a account
                </div>
            
              </div>
              <div className='text-red-400 text-sm'>{errmsg}</div>
              <Button name={'Signin'} size={'normal'} onClick={onsignin}/>
            </div>        
        </div>
    </div>

    : <div className='flex justify-center flex-col items-center pt-[10%] gap-4'>
    <div className='text-green-500 text-xl font-semibold'>Signup</div>
      <div className='Card shadow py-8 px-12 rounded-md flex flex-col gap-6'>
      <Inputcard tagname={'Name'} type={'name'} selectedOne={name} set_selectedOne={setname}/>
          <Inputcard tagname={'Email'} type={'email'} selectedOne={email} set_selectedOne={setemail}/>
          <Inputcard tagname={'Password'} type={'password'} selectedOne={password} set_selectedOne={setpassword}/>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
            <div className='text-sm font-thin' onClick={changeblock}>
            already have a account
              </div>
            </div>
            <div className='text-red-400 text-sm'>{errmsg}</div>
            <Button name={'Signup'} size={'normal'} onClick={onsignup}/>
          </div>        
      </div>
  </div>
 
  )
}

export default Signin