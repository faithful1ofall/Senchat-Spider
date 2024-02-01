import React from "react";

import { Button, Img, Input, Line, List, Text } from "components";
import DesktopSeventeenListrectangleone from "components/DesktopSeventeenListrectangleone";
import { Link } from "react-router-dom";

import { CloseSVG } from "../../assets/images";
import Navbar from "components/Header2/navbar";

const Portfolio = () => {
  const [framesixvalue, setFramesixvalue] = React.useState("");

  return (
    <>
      <Navbar className="flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
      <div className="bg-gray-100 pt-6 sm:pt-10 flex flex-col font-prompt items-center justify-end mx-auto w-full">
        <div className="flex flex-col items-center justify-end w-full">
          {/* <div className="h-[134px] md:h-[346px] sm:h-[75px] md:px-5 relative w-full">
            <div className="absolute flex flex-row gap-5 h-max inset-y-[0] items-center justify-between my-auto right-[27%] w-[350px]">
              <Button className="bg-teal-200_19 flex h-[37px] items-center justify-center p-2.5 rounded-[18px] w-[37px]">
                <Img
                  className="h-[15px]"
                  src="images/img_arrowleft.svg"
                  alt="arrowleft"
                />
              </Button>
              <Text
                className="text-[17px] text-black-900 w-auto"
                size="txtPromptBold17"
              >
                Name of NFT
              </Text>
              <Img
                className="h-[18px] w-5"
                src="images/img_mail_teal_a400.svg"
                alt="mail"
              />
            </div>
            <div className="absolute bg-gray-100 bottom-[0] h-[59px] inset-x-[0] mx-auto w-full"></div>
            <div className="absolute bg-black-900 flex md:flex-col flex-row md:gap-5 inset-x-[0] items-center justify-start mx-auto p-1.5 top-[0] w-full">
              <div className="flex md:flex-1 flex-col gap-[5px] items-center justify-start md:ml-[0] ml-[53px] w-[4%] md:w-full">
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
              </div>
              <div className="flex md:flex-1 flex-row items-center justify-center ml-11 md:ml-[0] sm:pr-5 pr-[27px] w-[21%] md:w-full">
                <Text
                  className="text-white-A700 text-xl"
                  size="txtPromptBold20WhiteA700"
                >
                  Forum
                </Text>
                <Text
                  className="ml-[52px] text-white-A700 text-xl"
                  size="txtPromptBold20WhiteA700"
                >
                  Threads
                </Text>
                <Text
                  className="ml-[51px] text-teal-A400 text-xl"
                  size="txtPromptBold20"
                >
                  NFT
                </Text>
              </div>
              <Input
                name="frameSix"
                placeholder="Search...."
                value={framesixvalue}
                onChange={(e) => setFramesixvalue(e)}
                className="leading-[normal] p-0 placeholder:text-gray-700_a5 sm:px-5 text-gray-700_a5 text-left text-xs w-full"
                wrapClassName="bg-gray-100 flex md:flex-1 md:ml-[0] ml-[60px] md:mt-0 my-[5px] pl-[21px] pr-[35px] py-[15px] rounded-[25px] w-[31%] md:w-full"
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
              <div className="flex md:flex-1 flex-row gap-[25px] items-start justify-center md:ml-[0] ml-[181px] w-[13%] md:w-full">
                <Text
                  className="text-white-A700 text-xl"
                  size="txtPromptBold20WhiteA700"
                >
                  New post
                </Text>
                <Text
                  className="text-base text-white-A700"
                  size="txtPromptBold16"
                >
                  username
                </Text>
              </div>
              <Img
                className="h-[34px] md:h-auto md:ml-[0] ml-[19px] rounded-[50%] w-[34px]"
                src="images/img_ellipse42.png"
                alt="ellipseFortyThree"
              />
              <Img
                className="h-[23px] ml-5 md:ml-[0]"
                src="images/img_notification.svg"
                alt="notification"
              />
            </div>
          </div> */}
          <List
            className="sm:flex-col flex-row gap-[22px] grid md:grid-cols-1 grid-cols-2 justify-center max-w-[1421px] mx-auto md:px-5 w-full"
            orientation="horizontal"
          >
            <div className="sm:h-[30rem] h-[] md:h-[2054px] sm:ml-[0] relative w-full">
              <div className="absolute sm:-top-[10rem]  sm:flex sm:flex-col mt-80 sm:mt-[50rem] bottom-[0] flex flex-col gap-6 inset-x-[0] items-center justify-start mx-auto w-[98%]">
                <div className="flex flex-col gap-2.5 items-center justify-start pb-[15px] w-full">
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_18.png"
                        alt="rectangleOne"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col sm:pt-36 items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col md:gap-5 sm:gap-10 items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_27x27.png"
                            alt="ellipseOne"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-start justify-evenly">
                            <Img
                              className="h-3.5 mt-1"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_19.png"
                        alt="rectangleOne_One"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-5 items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_3.png"
                            alt="ellipseOne_One"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-start justify-evenly">
                            <Img
                              className="h-3.5 mt-1"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_One"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_20.png"
                        alt="rectangleOne_Two"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-5 items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_4.png"
                            alt="ellipseOne_Two"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                          <Text
                            className="text-[13.32px] text-black-900"
                            size="txtPromptMedium1332"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-start justify-evenly">
                            <Img
                              className="h-3.5 mt-1"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Two"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[76px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px] sm:w-full"
                        src="images/img_rectangle1_76x77.png"
                        alt="rectangleOne_Three"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-[17px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[13.32px] text-teal-A400"
                              size="txtPromptMedium1332TealA400"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_5.png"
                            alt="ellipseOne_Three"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
                          <Text
                            className="text-[13.32px] text-black-900"
                            size="txtPromptMedium1332"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-start justify-evenly">
                            <Img
                              className="h-3.5 mt-1"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Three"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[76px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px] sm:w-full"
                        src="images/img_rectangle1_21.png"
                        alt="rectangleOne_Four"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start pt-0.5 w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_6.png"
                            alt="ellipseOne_Four"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Four"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_22.png"
                        alt="rectangleOne_Five"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="md:h-[21px] h-[34px] mt-[3px] relative w-[15%]">
                            <Text
                              className="absolute inset-x-[0] mx-auto text-[13.32px] text-black-900 top-[0] w-max"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="absolute bottom-[0] left-[0] text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_7.png"
                            alt="ellipseOne_Five"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Five"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[76px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px] sm:w-full"
                        src="images/img_rectangle1_23.png"
                        alt="rectangleOne_Six"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_8.png"
                            alt="ellipseOne_Six"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Six"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_24.png"
                        alt="rectangleOne_Seven"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="md:h-[21px] h-[34px] mt-[3px] relative w-[15%]">
                            <Text
                              className="absolute inset-x-[0] mx-auto text-[13.32px] text-black-900 top-[0] w-max"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="absolute bottom-[0] left-[0] text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_9.png"
                            alt="ellipseOne_Seven"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Seven"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[77px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px]"
                        src="images/img_rectangle1_25.png"
                        alt="rectangleOne_Eight"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_10.png"
                            alt="ellipseOne_Eight"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Eight"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 flex md:flex-col flex-row gap-[21.88px] items-center justify-start max-w-[1041px] px-2.5 py-[5px] rounded-[15px] w-full">
                    <div className="flex flex-col h-[77px] items-center justify-start w-[77px]">
                      <Img
                        className="h-[76px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-[77px] sm:w-full"
                        src="images/img_rectangle1_26.png"
                        alt="rectangleOne_Nine"
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start pt-0.5 w-[90%] md:w-full">
                      <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-start mt-[3px]">
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptSemiBold1332"
                            >
                              Power of friendship
                            </Text>
                            <Text
                              className="text-[11.42px] text-teal-A400"
                              size="txtPromptMedium1142"
                            >
                              @anasabdin
                            </Text>
                          </div>
                          <Img
                            className="h-[27px] md:h-auto rounded-[50%] w-[27px]"
                            src="images/img_ellipse1_11.png"
                            alt="ellipseOne_Nine"
                          />
                        </div>
                        <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                          <Text
                            className="text-[11.42px] text-black-900"
                            size="txtPromptMedium1142Black900"
                          >
                            Current Price
                          </Text>
                          <div className="flex flex-row items-center justify-evenly">
                            <Img
                              className="h-3.5"
                              src="images/img_arrowdown.svg"
                              alt="arrowdown_Nine"
                            />
                            <Text
                              className="text-[13.32px] text-black-900"
                              size="txtPromptMedium1332"
                            >
                              1.02 ETH
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-gray-100 flex flex-col inset-x-[0] items-center justify-start mx-auto pb-[17px] pl-[17px] top-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="gap-[20px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-2 items-center justify-start w-[95%] md:w-full">
                    <Link
                      to="/portfolio"
                      className="bg-teal-A400 cursor-pointer font-semibold h-[60px] leading-[normal] py-[15px] rounded-[30px] text-[19.27px] text-black-900 text-center w-full"
                    >
                      All
                    </Link>
                    <Link
                      to="/coming-soon"
                      className="border-2 border-blue_gray-400 border-solid cursor-pointer font-semibold h-[60px] leading-[normal] py-[15px] rounded-[30px] text-[19.27px] text-blue_gray-400 text-center w-full"
                    >
                      Paintings
                    </Link>
                    <Link
                      to="/coming-soon"
                      className="border-2 border-blue_gray-400 border-solid cursor-pointer font-semibold h-[60px] leading-[normal] py-[15px] rounded-[30px] text-[19.27px] text-blue_gray-400 text-center w-full"
                    >
                      3D Animations
                    </Link>
                    <Link
                      to="/coming-soon"
                      className="border-2 border-blue_gray-400 border-solid cursor-pointer font-semibold h-[60px] leading-[normal] py-[15px] rounded-[30px] text-[19.27px] text-blue_gray-400 text-center w-full"
                    >
                      Illustration
                    </Link>
                  </div>
                  <div className="flex flex-col items-start justify-start mt-[46px] p-1 w-full">
                    <Text
                      className="mb-[22px] mt-[17px] sm:text-4xl md:text-[38px] text-[40px] text-black-900"
                      size="txtPromptBold40"
                    >
                      Portfolio Overview
                    </Text>
                  </div>
                  <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start mt-[5px] w-[71%] md:w-full">
                    <div className="flex flex-col gap-[7px] items-start justify-start">
                      <Text
                        className="text-2xl md:text-[22px] text-blue_gray-900_01 sm:text-xl"
                        size="txtPromptSemiBold24Bluegray90001"
                      >
                        Wallet Balance
                      </Text>
                      <Text
                        className="ml-1 md:ml-[0] text-3xl sm:text-[26px] md:text-[28px] text-black-900"
                        size="txtPromptMedium30Black900"
                      >
                        $20,139.64
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center mb-0.5 ml-0.5 md:ml-[0] md:mt-0 mt-12 w-[27%] md:w-full">
                      <Img
                        className="h-[22px]"
                        src="images/img_send.svg"
                        alt="send"
                      />
                      <Text
                        className="sm:text-[21.5px] md:text-[23.5px] text-[25.5px] text-blue_gray-400"
                        size="txtPromptSemiBold255Bluegray400"
                      >
                        2,000.02 ETH
                      </Text>
                    </div>
                    <Button className="bg-teal-A400 cursor-pointer font-semibold leading-[normal] mb-1 min-w-[146px] md:ml-[0] ml-[54px] md:mt-0 mt-[35px] py-3 rounded-[15px] text-[16.34px] text-black-900 text-center tracking-[-0.49px]">
                      DEPOSIT
                    </Button>
                    <Button className="border border-blue_gray-400 border-solid cursor-pointer font-semibold leading-[normal] mb-1 min-w-[146px] ml-4 md:ml-[0] md:mt-0 mt-[35px] py-3 rounded-[15px] text-[16.34px] text-blue_gray-400 text-center tracking-[-0.49px]">
                      WITHDRAWAL
                    </Button>
                  </div>
                  <Line className="bg-teal-100 h-[3px] mt-7 w-full" />
                </div>
              </div>
            </div>
            <div className="flex sm:pt-[25rem] sm:hidden flex-1 flex-col gap-2.5  mb-[32px] sm:ml-[0] w-full">
              <Text
                className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                size="txtPromptBold24"
              >
                Recommended for you
              </Text>
              <div className="flex flex-col items-center justify-start w-full">
                <DesktopSeventeenListrectangleone className="flex flex-col gap-[19.03px] items-start justify-start w-[333px]" />
              </div>
            </div>
          </List>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
