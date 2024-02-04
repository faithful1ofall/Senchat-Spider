import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Line, List, Text } from "components";
import ContractABI from '../../utils/contractabi.json';
import { configureChains, createConfig, InjectedConnector, getAccount, readContract } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { bscTestnet } from "viem/chains";
import { hexToBigInt } from 'viem';
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';





const DesktopFourColumnp = (props) => {
  const [data, setData] = useState();
  const projectId = process.env.REACT_APP_PROJECTID;

const metadata = {
  name: 'Senchat',
  description: 'Senchat web3Modal connector',
  url: 'https://senchatfront.vercel.app/'
}

const { chains, publicClient } = configureChains(
  [bscTestnet],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
  ],
  publicClient
})

const nftcontract = process.env.REACT_APP_NFTCONTRACT;
// const account = getAccount();
const digit = hexToBigInt('0x03');
const big = digit % 10n;



  const func = async (index) => {
    try {
      const tokenId = await readContract({
        address: nftcontract,
        abi: ContractABI,
        functionName: 'tokenByIndex',
        args: [index]
      });

      const tokenURI = await readContract({
        address: nftcontract,
        abi: ContractABI,
        functionName: 'tokenURI',
        args: [`${tokenId}`]
      });
  
      // Use the fetched details as needed
/*       console.log('Token ID:', tokenId);
      console.log('Owner:', owner);
      console.log('Token URI:', tokenURI); */
  
      // Return the details or perform additional actions
      return {
        tokenId,
        tokenURI,
      };
    } catch (error) {
      console.error(`Error fetching details for token at index ${index}:`, error.message);
      return null; // or throw the error if needed
    }
  };

  const fetchAllTokenDetails = async (startIndex, endIndex) => {
    const allTokenDetails = [];
  
    // Create an array of promises for concurrent execution
    const promises = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => func(i + startIndex));
  
    // Use Promise.all to wait for all promises to resolve
    const results = await Promise.all(promises);
  
    // Filter out null results (errors) and add valid results to the array
    results.filter((result) => result !== null).forEach((result) => allTokenDetails.push(result));
  
    return allTokenDetails;
  }

  fetchAllTokenDetails(0, 13).then((allTokenDetails) => {
    
    setData(allTokenDetails);
    console.log('All Token Details:', allTokenDetails);
  });
/*  const totalSupply = await readContract({
    address: nftcontract,
    abi: ContractABI,
    functionName: 'totalSupply',
  });

  for (let i = 0; i <= totalSupply; i++) {
  const url = await readContract({
    address: nftcontract,
    abi: ContractABI,
    functionName: 'tokenByIndex',
    args: [`${i}`]
  });
  
  console.log(url);
}*/



  return (
    <>
      <div className={props.className}>
        <List
          to="/thread"
          className="flex flex-col gap-[20px] items-center w-full shadow-xl"
          orientation="vertical"
        >
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[16px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-black-900 text-center text-xl w-[46px]">
                {props?.p}{data}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 py-3 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-teal-A400 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.m}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread1}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin1}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education1}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time1}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-400 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.l}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread2}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin2}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education2}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time2}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-deep_purple-A200 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.o}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread3}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin3}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education3}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time3}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-black-900 text-center text-xl w-[46px]">
                {props?.m1}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread4}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin4}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education4}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time4}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[73%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-400 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.t}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread5}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin5}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education5}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.time5}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-row gap-4 items-end justify-center pr-[3px] py-[3px] w-[14%] md:w-full">
              <Line className="bg-gray-500_02 h-12 w-px" />
              <div className="md:h-[31px] h-[41px] mr-[41px] my-[5px] relative w-[56%]">
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.anasabdinone10}
                </Text>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.repliescounter13}
                </Text>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.m2}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread6}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                  <Text
                    className=" left-[0] text-gray-500_02 text-sm top-[0]"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin6}
                  </Text>

                  <Text
                    className="text-teal-A400  text-sm top-[0] "
                    size="txtPromptMedium14"
                  >
                    {props?.education6}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p5thmarch2023}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-row gap-4 items-end justify-center pr-[3px] py-[3px] w-[14%] md:w-full">
              <Line className="bg-gray-500_02 h-12 w-px" />
              <div className="md:h-[31px] h-[41px] mr-10 my-[5px] relative w-[57%]">
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.anasabdinone10}
                </Text>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.repliescounter13}
                </Text>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-pink-A200 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.b}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread7}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin7}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education7}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p4thmarch2023}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-center justify-start mb-1.5 w-[74%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-gray-500_02 cursor-pointer font-prompt font-semibold h-[45px] leading-[normal] py-[7px] rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.h}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread8}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin8}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education8}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p3rdmarch2023}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[62%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-center justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-yellow-900 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.c}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread9}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin9}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education9}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p2ndmarch2023}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.s}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread10}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin10}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education10}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p2ndmarch20231}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-3/4 md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.s1}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread11}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin11}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education11}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p1stmarch2023}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.s2}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread12}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin12}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education12}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p1stmarch20231}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
          <Line className="self-center h-px bg-teal-100 w-full" />
          <Link
            to="/thread"
            className="flex flex-1 md:flex-col flex-row gap-[15px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
          >
            <Link to="/thread">
              <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-2 rounded-[10px] text-center text-white-A700 text-xl w-[46px]">
                {props?.s3}
              </Button>
            </Link>
            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
              <div className="flex flex-col items-start justify-start w-[21%] md:w-full">
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="text-[17px] text-black-900"
                    size="txtPromptSemiBold17"
                  >
                    {props?.titleofthread13}
                  </Text>
                </div>
                <div className="flex flex-row gap-[7px] items-center justify-between mt-0.5 w-full">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdin13}
                  </Text>
                  <Text
                    className="text-teal-A400 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.education13}
                  </Text>
                </div>
                <Text
                  className="text-gray-500_02 text-sm"
                  size="txtPromptMedium14"
                >
                  {props?.p1stmarch20232}
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-col items-start justify-start pr-[3px] py-[3px] w-[14%] md:w-full">
              <div className="flex flex-row gap-4 items-end justify-start mb-1.5 w-[77%] md:w-full">
                <Line className="bg-gray-500_02 h-12 w-px" />
                <div className="flex flex-col items-start justify-start mt-1.5">
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.repliescounter13}
                  </Text>
                  <Text
                    className="text-gray-500_02 text-sm"
                    size="txtPromptMedium14"
                  >
                    {props?.anasabdinone10}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
        </List>
      </div>
    </>
  );
};

DesktopFourColumnp.defaultProps = {
  p: "P",
  titleofthread: "Title of Thread",
  anasabdin: "@anasabdin",
  education: "Education",
  time: "Today at 5:00pm",
  repliescounter: "Replies 300",
  anasabdinOne: "Views 2k",
  m: "M",
  titleofthread1: "Title of Thread",
  anasabdin1: "@anasabdin",
  education1: "Education",
  time1: "Today at 3:00pm",
  repliescounter1: "Replies 300",
  anasabdinone1: "Views 2k",
  l: "L",
  titleofthread2: "Title of Thread",
  anasabdin2: "@anasabdin",
  education2: "Education",
  time2: "Today at 2:00am",
  repliescounter2: "Replies 300",
  anasabdinone2: "Views 2k",
  o: "O",
  titleofthread3: "Title of Thread",
  anasabdin3: "@anasabdin",
  education3: "Education",
  time3: "Yesterday at 4:00pm",
  repliescounter3: "Replies 300",
  anasabdinone3: "Views 2k",
  m1: "M",
  titleofthread4: "Title of Thread",
  anasabdin4: "@anasabdin",
  education4: "Education",
  time4: "Yesterday at 2:50pm",
  repliescounter4: "Replies 300",
  anasabdinone4: "Views 2k",
  t: "T",
  titleofthread5: "Title of Thread",
  anasabdin5: "@anasabdin",
  education5: "Education",
  time5: "Yesterday at 1:00pm",
  viewscounter: "Views 2k",
  repliescounter5: "Replies 300",
  m2: "M",
  titleofthread6: "Title of Thread",
  anasabdin6: "@anasabdin",
  education6: "Education",
  p5thmarch2023: "5th March, 2023",
  viewscounter1: "Views 2k",
  repliescounter6: "Replies 300",
  b: "B",
  titleofthread7: "Title of Thread",
  anasabdin7: "@anasabdin",
  education7: "Education",
  p4thmarch2023: "4th March, 2023",
  repliescounter7: "Replies 300",
  anasabdinone5: "Views 2k",
  h: "H",
  titleofthread8: "Title of Thread",
  anasabdin8: "@anasabdin",
  education8: "Education",
  p3rdmarch2023: "3rd March, 2023",
  repliescounter8: "Replies 300",
  viewscounter2: "Views 2k",
  c: "C",
  titleofthread9: "Title of Thread",
  anasabdin9: "@anasabdin",
  education9: "Education",
  p2ndmarch2023: "2nd March, 2023",
  repliescounter9: "Replies 300",
  anasabdinone6: "Views 2k",
  s: "S",
  titleofthread10: "Title of Thread",
  anasabdin10: "@anasabdin",
  education10: "Education",
  p2ndmarch20231: "2nd March, 2023",
  repliescounter10: "Replies 300",
  anasabdinone7: "Views 2k",
  s1: "S",
  titleofthread11: "Title of Thread",
  anasabdin11: "@anasabdin",
  education11: "Education",
  p1stmarch2023: "1st March, 2023",
  repliescounter11: "Replies 300",
  anasabdinone8: "Views 2k",
  s2: "S",
  titleofthread12: "Title of Thread",
  anasabdin12: "@anasabdin",
  education12: "Education",
  p1stmarch20231: "1st March, 2023",
  repliescounter12: "Replies 300",
  anasabdinone9: "Views 2k",
  s3: "S",
  titleofthread13: "Title of Thread",
  anasabdin13: "@anasabdin",
  education13: "Education",
  p1stmarch20232: "1st March, 2023",
  repliescounter13: "Replies 300",
  anasabdinone10: "Views 2k",
};

export default DesktopFourColumnp;
