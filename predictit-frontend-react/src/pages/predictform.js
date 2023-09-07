import React, { useState } from "react";
import Selectcard from "../components/selectcard";
import Button from "../components/button";
import modelfile from "../predictfacts/applemodels.json";
import locationfile from "../predictfacts/locations.json";
import {  condition, box } from "../predictfacts/others.js";
import {model_space} from '../assests/model_space'
import phone from "../assests/phone2.jpg";
import close from "../assests/Vectorclosesvg.svg";
import { useEffect } from "react";
const Predictitform = () => {
  let models = [],
    locations = [];
  modelfile.forEach((data, index) => {
    models.push(data[0]);
  });

  const [selectModel, set_selectedOne] = useState("");
  const [selectSpace, set_selectSpace] = useState("");
  const [selectCondition, set_selectCondition] = useState("");
  const [selectBox, set_selectBox] = useState("");
  const [selectLocation, set_selectLocation] = useState("");

  // predicted result and showing model
  const [showModal, setShowModal] = useState(false);
  const [predicted, setpredicted] = useState("");

  const [clear, setclear] = useState(false);

  // set with location or not
  const [checked, setChecked] = useState(true);

  

  // const space_allocate=()=>{
  
  //   console.log(model_space[selectModel])
    
  // }
  // space_allocate()
  const space=model_space[selectModel]

  const predict=async()=>{
    try {
      const response = await fetch("http://127.0.0.1:5000/predictit", {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Condition: selectCondition,
          Model: selectModel,
          Location: selectLocation,
          Box: selectBox == "Yes" ? 1 : 0,
          Space: parseInt(selectSpace),
        }),
      });
      if (response) {
        setpredicted(await response.json());
        // console.log(await response.json());
        setShowModal(true);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const predict_without_location=async()=>{
    try {
      const response = await fetch("http://127.0.0.1:5000/predictit/Without_Location", {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Condition: selectCondition,
          Model: selectModel,
          // Location: selectLocation,
          Box: selectBox == "Yes" ? 1 : 0,
          Space: parseInt(selectSpace),
        }),
      });
      if (response) {
        setpredicted(await response.json());
        // console.log(await response.json());
        setShowModal(true);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const onPredict = async () => {
    if(checked){
      if(selectCondition && selectModel && selectBox && selectSpace && selectLocation){
         predict() 
        }
    }
    else{
      if(selectCondition && selectModel && selectBox && selectSpace){
        predict_without_location()
       }
    }
    
  };

  locations = Object.keys(locationfile[0]).map((locid) => {
    return locationfile[0][locid];
  });
 
  // console.log(selectModel);
  return (
    <div className="flex justify-center flex-col items-center pt-[8%] gap-4">
      <div className="Card shadow py-8 px-12 rounded-md flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 ">
            <Selectcard
              tagname={"Model"}
              type={"Full"}
              data={models}
              selectedOne={selectModel}
              set_selectedOne={set_selectedOne}
              clear={clear}
            />
          </div>
          <div className="col-span-2 ">
            <Selectcard
              tagname={"Space - GB"}
              type={"Full"}
              data={space}
              selectedOne={selectSpace}
              set_selectedOne={set_selectSpace}
              disabled={selectModel === "" ? true : false}
              clear={clear}
            />
          </div>

          <div className=" ">
            <Selectcard
              tagname={"Condition"}
              type={"Half"}
              data={condition}
              selectedOne={selectCondition}
              set_selectedOne={set_selectCondition}
              clear={clear}
            />
          </div>
          <div className="  ">
            <Selectcard
              tagname={"Box"}
              type={"Half"}
              data={box}
              selectedOne={selectBox}
              set_selectedOne={set_selectBox}
              clear={clear}
            />
          </div>
          <div className="col-span-2">
            <Selectcard
              className="col-span-2"
              tagname={"Location"}
              type={"Full"}
              data={locations}
              selectedOne={selectLocation}
              set_selectedOne={set_selectLocation}
              disabled={!checked && true}
              clear={clear}
            />
          </div>

          {/* /* full/half/none */}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between ">
            <div className=" flex-1 flex gap-2">
            <input
              type="checkbox"
              className="bg-green-500 text-green-500"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <div className="text-sm font-thin">Keep Location</div>
            </div>
            
            
          </div>
          <div>
            <Button name={"Predict"} size={"big"} onClick={onPredict} />
          </div>
        </div>
      </div>
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden bg-slate-300 overflow-y-auto fixed inset-0  z-50 outline-none focus:outline-none rounded-lg">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                  <img src={phone} width={400} className="rounded-xl" />
                  <div className="absolute top-[45%] left-[32%]">
                    <div
                      className={`  text-white px-2 py-[3px] border-2 bg-green-500 rounded-md flex justify-center active:border-green-500 active:bg-white active:text-green-500 w-[500]`}
                    >
                      <div className=" font-normal text-2xl ">
                        {predicted.price}.00 $
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-1 top-2">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setShowModal(false)}
                    >
                      <path
                        d="M19.5 0C8.7165 0 0 8.7165 0 19.5C0 30.2835 8.7165 39 19.5 39C30.2835 39 39 30.2835 39 19.5C39 8.7165 30.2835 0 19.5 0ZM29.25 26.5005L26.5005 29.25L19.5 22.2495L12.4995 29.25L9.75 26.5005L16.7505 19.5L9.75 12.4995L12.4995 9.75L19.5 16.7505L26.5005 9.75L29.25 12.4995L22.2495 19.5L29.25 26.5005Z"
                        // fill="#64748B"
                        className="fill-slate-400 hover:fill-red-500  flex justify-center items-center"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
};

export default Predictitform;
