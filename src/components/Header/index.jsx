import React, { useEffect, useState } from "react";
import { Button, Img, Input, Text } from "components";
import { CloseSVG } from "../../assets/images";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [framesixvalue, setFramesixvalue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={props.className}>
        <div className="flex items-center justify-between ml-12 md:ml-0 mr-5 my-6 w-11/12">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Img
                className={`h-10 md:h-small ${isMobile ? "mr-12" : ""}`}
                src="images/img_image3.png"
                alt="logo"
              />
              {!isMobile && (
                <Text
                  className="text-[7.39px] text-teal-A400"
                  size="txtPromptSemiBold739"
                >
                  SENCHAT
                </Text>
              )}
            </Link>
          </div>
          <div className="flex flex-grow justify-end gap-5 items-center">
            <Input
              name="frameSix"
              placeholder="Search...."
              value={framesixvalue}
              onChange={(e) => setFramesixvalue(e)}
              className="font-prompt leading-[normal] p-0 placeholder:text-gray-700_a5 sm:px-5 text-colors text-left text-xs h-[10px] w-full max-w-sm md:h-small "
              wrapClassName="bg-gray-100 border border-gray-500 border-solid flex mb-1.5 pl-3 pr-10 py-4 rounded-[26px]"
              prefix={
                <div className="h-[17px] w-[17px] my-auto">
                  <Img
                    className="cursor-pointer h-full my-auto"
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
            {isMobile ? (
              <button
                className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-md"
                onClick={toggleMenu}
              >
                <div className="w-5 h-[2px] bg-white"></div>
                <div className="w-5 h-[2px] mt-1.5 bg-white"></div>
                <div className="w-5 h-[2px] mt-1.5 bg-white"></div>
              </button>
            ) : (
              <div className="flex gap-5">
                <Link
                  to="/signin"
                  className="bg-teal-A400 cursor-pointer font-medium font-prompt min-w-[91px] py-[13px] rounded-[13px] text-black-900 text-center text-lg"
                >
                  <Button
                  // className="bg-teal-A400 cursor-pointer font-medium font-prompt min-w-[91px] py-[13px] rounded-[13px] text-black-900 text-center text-lg"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )}

            {isMobile && isMenuOpen && (
              <div className="flex flex-col gap-5">
                <Link
                  href="/signin"
                  className="bg-teal-A400 cursor-pointer font-medium font-prompt min-w-[91px] py-[13px] rounded-[13px] text-black-900 text-center text-lg"
                >
                  <Button
                  // className="bg-teal-A400 cursor-pointer font-medium font-prompt min-w-[91px] py-[13px] rounded-[13px] text-black-900 text-center text-lg"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

Header.defaultProps = {};

export default Header;
