import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./MessageEditor";
import "./messageEditor.css";

import { Button, Img, Input, Text } from "components";
import Navbar from "components/Header2/navbar";
import { config } from "./MessageEditor";

import { CloseSVG } from "../../assets/images";

const Message = () => {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(message);

  // const handleAlert = () => {
  //   setAlertMessage("Your post has been sent!");
  //   setTimeout(() => {
  //     setAlertMessage("");
  //   }, 3000);
  // };

  const handleChange = (e) => {
    const messageValue =
      e.target.children[0].childNodes[1].firstElementChild.innerHTML;
    setMessage(messageValue);
    console.log(messageValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageValue =
      e.target.children[0].childNodes[1].firstElementChild.textContent;
    setMessage(messageValue);
    if (messageValue == "") {
      console.log(messageValue);
      setErrorMessage("This field cant be empty!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      console.log(messageValue);

      setSuccessMessage("Your post has been sent!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setMessage("");
    }
  };
  return (
    <>
      {/* <Navbar className="flex md:flex-col flex-row md:gap-5 items-center justify-center mb-0.5 md:px-5 w-full" /> */}

      <div className="bg-gray-100 flex flex-col font-prompt items-center justify-end mx-auto">
        <div className="flex flex-col gap-[11px] items-center justify-start  mt-[3px] mx-auto pb-[14px] md:px-5 w-full">
          <div className="bg-gray-100 flex flex-col gap-1.5 justify-center pl-1 py-1 w-full">
           {/*  <Text
              className="md:ml-[0] ml-[15px] mr-[1044px] mt-[68px] sm:text-4xl md:text-[38px] text-[40px] text-black-100"
              size="txtPromptBold20"
            >
              Thread your feeling
            </Text> */}
            <div className="h-7 md:h-[31px] mt-[3px] w-full">
              <div className="flex px-5 gap-8 sm:gap-[0.6rem] border border-solid border-teal-100 mt-auto mx-auto w-full md:h-7 h-[26px] m-auto">
                {/* <div className="border border-solid border-teal-100 h-7 mt-auto mx-auto w-full"></div> */}
                <div className="flex items-center">
                  <Text
                    className="text-[16.8px] sm:text-[14px] text-blue_gray-400"
                    size="txtPromptMedium168"
                  >
                    Forum
                  </Text>
                  <Img
                    className="h-5 sm:h-4"
                    src="images/img_arrowright.svg"
                    alt="arrowright"
                  />
                </div>
                <div className="flex items-center">
                  <Text
                    className="text-[16.8px] sm:text-[14px] text-blue_gray-400"
                    size="txtPromptMedium168"
                  >
                    Feeds
                  </Text>
                  <Img
                    className="h-5 sm:h-4"
                    src="images/img_arrowright.svg"
                    alt="arrowright_One"
                  />
                </div>
                {/* <div className="flex items-center flex-1">
                  <Text
                    className="text-[16.8px] sm:text-[14px] text-blue_gray-400"
                    size="txtPromptMedium168"
                  >
                    Thread topic
                  </Text>
                  <Img
                    className="h-5 sm:h-4"
                    src="images/img_arrowright.svg"
                    alt="arrowright_Two"
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div
            className={
              successMessage || errorMessage ? "relative top-0 " : "hidden"
            }
          >
            {successMessage ? (
              <p className="bg-white shadow-lg p-5 text-center text-green-500">
                {successMessage}
              </p>
            ) : (
              ""
            )}{" "}
            {errorMessage ? (
              <p className="bg-red-500 shadow-lg p-4 text-center text-white">
                {errorMessage}
              </p>
            ) : (
              ""
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:w-full w-[50rem]"
          >
            <ReactQuill
              theme="snow"
              value={message}
              modules={modules}
              formats={formats}
              placeholder="Whats on your mind..."
              onEditorChange={handleChange}
            />
            <button
              type="submit"
              className="bg-cyan-300 py-2 px-3 rounded-md mt-5 "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Message;
