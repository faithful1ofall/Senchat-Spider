import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Img, Text } from "components";
// import Header from "components/Header2/navbar";
import Header from "components/Header/index";
import { configureChains, createConfig, InjectedConnector, getAccount, readContract, watchAccount } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { bscTestnet } from "viem/chains";
import { hexToBigInt } from 'viem';
import { createWeb3Modal, walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import ContractABI from '../../utils/contractabi.json';



const Signin = () => {
  const projectId = process.env.REACT_APP_PROJECTID;
  const nftcontract = process.env.REACT_APP_NFTCONTRACT;
  const [isConnected, setIsConnected] = useState();
  const [errMessage, seterrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useNavigate();

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

  const modal = createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    defaultChain: bscTestnet
  });

  const account = getAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account.isConnected) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [account.isConnected]);

  const openmodal = () => {
    modal.open();
    modal.subscribeEvents(async (event) => {
      if (event.data.event === 'CONNECT_SUCCESS') {
        setIsConnected(true);
      } 
      });
    watchAccount((account) => {
      if (account.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

  }

  const connectToWeb3 = async () => {

        const digit = hexToBigInt(account.address);
        const big = digit % 10000n;

        try {
          const url = await readContract({
            address: nftcontract,
            abi: ContractABI,
            functionName: 'tokenURI',
            args: [`12${big}`]
          });
          const hash = url.replace('ipfs://', '');
          const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${hash}`;

          const response = await fetch(cloudflareUrl);

          if (!response.ok) {
            seterrMessage(`Failed to fetch from IPFS. Status: ${response.status}`);
            throw new Error(`Failed to fetch from IPFS. Status: ${response.status}`);
          }

          const userData = await response.json();
          //      const userdata = new URLSearchParams(userData);

          localStorage.setItem('userData', JSON.stringify(userData));
          console.log(url);
          setSuccessMessage(`connected succesfully ${cloudflareUrl}`);
          history(`/education`, { replace: true });

        } catch (error) {
          console.error(error);
          // seterrMessage(`Failed to fetch from IPFS. Status: ${response.status}`); 
          seterrMessage('Account Do not Exist and try to signup');
        }



  }
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

            <Button
              onClick={openmodal}
              /* disabled={isConnected} */
              className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
            >
              {isConnected ? "Connected" : "Connect to Web3"}
            </Button>
            {isConnected && (
                <Button
                onClick={connectToWeb3}
                /* disabled={isConnected} */
                className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center bg-green-500" // Add your desired class for when connected
                >
                Verify and Sign in
                </Button>
            )}
            {errMessage && (
              <div className="text-red-600">{errMessage}</div>
            )}

            <div className="flex flex-col gap-11 items-center justify-start w-full">

              <div className="flex flex-col gap-[22.75px] items-start justify-start w-auto sm:w-full">
                {successMessage && (
                  <div className="text-green-600">{successMessage}</div>
                )}
              </div>
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
