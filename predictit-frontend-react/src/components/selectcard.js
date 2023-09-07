import React from "react";
import "./selectcard.css";
import { useEffect } from "react";
const Selectcard = ({ tagname, type, errmsg = "Fill this feild",data=[],selectedOne,set_selectedOne,disabled=false,clear}) => {
    // console.log(data)
    // const optiondata=[3,2,1]
    // console.log(tagname,)

    const changeselect=((e)=>{
      // console.log(e.target.value);
       set_selectedOne(e.target.value)
    })
   
  return (
    <div className="flex flex-col gap-[2.5px]  ">
      <div className="font-thin text-lg">{tagname}</div>
      <div className="flex flex-col gap-[1px] rounded-[135px] ">
        <div className="select ">
          <select
            name="slct"
            id="slct"
            className="text-slate-500 font-thin py-1 custom-select text-lg "
            onChange={changeselect}
            disabled={disabled}
          >
            <option value="" disabled selected={true} className="text-white text-sm">
              {tagname}
            </option>
            {data.map((d,i)=>(
             <option className="" value={d} key={i}>{d}</option>
            ))}
          </select>
          
        </div>
        {/* <input type={type}className='px-2 py-[2px] border-[1.5px] border-slate-500 rounded-md w-[200px] focus:bg-gre focus:border-blue-500 transition duration-300'/> */}
        <div className="text-red-400 text-sm ">{(!disabled && !selectedOne) ? errmsg : " "}</div>
      </div>
    </div>
  );
};

export default Selectcard;
