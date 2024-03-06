import React from "react";
import { Button, Img, Input, Text } from "components";
import { CloseSVG } from "../../assets/images";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const [framesixvalue, setFramesixvalue] = React.useState("");

  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex flex-col gap-[5px] items-start">
            <Link to="/">
              <Img
                className="h-[43px] md:h-auto object-cover w-full"
                src="images/img_image3.png"
                alt="imageThree"
              />
              <Text
                className="text-[7.39px] text-teal-A400"
                size="txtPromptSemiBold739"
              >
                SENCHAT
              </Text>
            </Link>
            <Input
              name="frameSix"
              placeholder="Search...."
              value={framesixvalue}
              onChange={(e) => setFramesixvalue(e.target.value)}
              className="font-prompt leading-[normal] p-0 placeholder:text-gray-700_a5 sm:px-5 text-gray-700_a5 text-left text-xs w-full"
              wrapClassName="bg-gray-100 border border-gray-500 border-solid flex mb-1.5 md:ml-[0] ml-[77px] pl-[21px] pr-[35px] py-4 rounded-[26px] w-[39%] md:w-full"
              prefix={
                <div className="h-[17px] mr-[5px] w-[17px] bg-gray-500_01 my-px">
                  <Img
                    className="cursor-pointer h-[17px] my-auto"
                    src="images/img_search.svg"
                    alt="search"
                  />
                </div>
              }
              suffix={
                <CloseSVG
                  fillColor="#616060a5"
                  className="cursor-pointer h-[17px] my-auto"
                  onClick={() => setFramesixvalue("")}
                  style={{
                    visibility:
                      framesixvalue?.length <= 0 ? "hidden" : "visible",
                  }}
                  height={17}
                  width={17}
                  viewBox="0 0 17 17"
                />
              }
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Link to="/desktopfour">
                <Text
                  className="text-teal-A400 text-lg"
                  size="txtPromptRegular18"
                >
                  Forum
                </Text>
              </Link>
            </div>
            <div>
              <Link to="/desktopten" className="text-black-900 text-lg">
                Threads
              </Link>
            </div>
            <div>
              <Link to="/desktopthirteen">
                <Text
                  className="text-black-900 text-lg"
                  size="txtPromptRegular18"
                >
                  NFT
                </Text>
              </Link>
            </div>
            <div>
              <Text
                className="text-black-900 text-lg"
                size="txtPromptRegular18"
              >
                New Post
              </Text>
            </div>
            <Button className="bg-teal-A400 cursor-pointer font-medium font-prompt min-w-[91px] py-[13px] rounded-[13px] text-black-900 text-center text-lg">
              Connect
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-sm text-gray-500 mr-3">
              Follow Us:
            </span>
            <a href="#" className="text-teal-A400 mr-3">
              Facebook
            </a>
            <a href="#" className="text-teal-A400 mr-3">
              Twitter
            </a>
            <a href="#" className="text-teal-A400">
              Instagram
            </a>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2024 Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
