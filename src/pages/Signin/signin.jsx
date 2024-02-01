import React from "react";

// import { useGoogleLogin } from "@react-oauth/google";

import { Button, Img, Text } from "components";
import Header from "components/Header";

// import { CloseSVG } from "../../assets/images";

const Signin = () => {
  /*  const googleSignIn = useGoogleLogin({
    onSuccess: (res) => {
      console.log("res", res);
      alert("Login successfull. 😍");
    },
  }); */

  return (
    <>
      <div className="bg-gray-100 flex flex-col font-prompt gap-11 items-end justify-start mx-auto w-full">
        <div className="flex flex-col items-center w-full">
          <Header className="bg-white-A700 flex flex-col items-center justify-center md:px-5 w-full" />
        </div>
        <div className="bg-white-A700 flex flex-col gap-[27px] items-center justify-start p-[33px] md:px-5 rounded-bl-[70px] rounded-tl-[70px] w-[63%] md:w-full">
          <div className="flex flex-col gap-[5px] items-center justify-start w-[7%] md:w-full">
            <Img
              className="h-[43px] md:h-auto object-cover w-full"
              src="images/img_image3.png"
              alt="imageThree_One"
            />
            <Text
              className="text-[7.39px] text-teal-A400"
              size="txtPromptSemiBold739"
            >
              SENCHAT
            </Text>
          </div>
          <div className="flex flex-col gap-[45.5px] items-center justify-start w-auto sm:w-full">
            <div className="flex flex-col gap-[18.2px] items-center justify-start w-auto sm:w-full">
              <Text
                className="sm:text-[32.4px] md:text-[34.4px] text-[36.4px] text-black-900 w-auto"
                size="txtPromptSemiBold364"
              >
                Welcome back
              </Text>
              <Text
                className="text-[18.2px] text-gray-600 tracking-[0.18px] w-auto"
                size="txtPromptRegular182"
              >
                Welcome back! Please connect your wallet.
              </Text>
            </div>
            <a
              href="/education"
              className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
            >
              <Button
              /* onClick={connectToWeb3} */
              /* disabled={isConnected} */

              // className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
                Connect to Web3
                {/*  {isConnected ?  : "Connect to Web3"} */}
              </Button>
            </a>
            <div className="flex flex-col gap-11 items-center justify-start w-full">
              <div className="flex flex-col gap-[22.75px] items-start justify-start w-auto sm:w-full"></div>
            </div>
          </div>
          <div className="flex flex-row font-roboto gap-[4.55px] items-center justify-start mb-[59px] w-auto">
            <Text
              className="text-[15.93px] text-gray-600 w-auto"
              size="txtRobotoRomanMedium1593"
            >
              Don’t have an account?{" "}
            </Text>
            <a
              href="/signup"
              className="text-[15.93px] text-teal-A400 w-auto"
            >
              <Text size="txtRobotoRomanMedium1593TealA400">Sign up</Text>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
