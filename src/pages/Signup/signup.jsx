import React, { useState } from "react";
import { Button, CheckBox, Img, Input, Text } from "components";
import Header from "components/Header";
import { post} from '../../utils/request';
import { configureChains, signMessage, createConfig, InjectedConnector, getAccount } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { bscTestnet } from "viem/chains";
import { createWeb3Modal, walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import Web3 from "web3";


const Signup = () => {  
  const [successMessage, setSuccessMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const projectId = 'ee459e804dfa88ec1036d10ab882c4bf';
  const chainId = bscTestnet.id;
  


  if (!projectId) {
    throw new Error('please check the PROJECT_ID env variable');
  }

  const metadata = {
    name: 'Senchat',
    description: 'Senchat web3Modal connector',
    url: 'https://senchatfront.vercel.app/'
  }

  //create wagmi config
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
  const web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545")
const account = getAccount();
const connectToWeb3 = async () => {
    modal.open();
  setMessage(account);
  
};

  
  const generateNonceAndSign = async () => {
    try {     
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      

      setMessage(account);
      // Fetch a nonce from your backend
          const response =  await post('/web3-login', {
            address: address,
            chainId: chainId
          });
    
          const nonce = response.nonce;

       const signature = await signMessage({
        message: nonce,
      })
 
      // Send the nonce and signature to your backend for verification
      const verifyResponse = await post('/web3-confirm-login', { address,
        chainId, signature, nonce });

      if (verifyResponse.token) {
        // Signature is valid
        const token  = verifyResponse.token;
        localStorage.setItem('jwtToken', token);
        console.log('Success', token);
        setSuccessMessage('Successfully signed and verified');
        setMessage(account);
      } else {
        setMessage(account);
        console.error('Signature verification failed');
      }

    } catch (error) {
      setMessage(account);
      console.error('Error signing nonce:', error);
    }
  };


  return (
 /*    <WagmiConfig config={wagmiConfig}> */
      <div className="bg-gray-100 flex flex-col font-prompt gap-[33px] items-end justify-end mx-auto w-full">
        <div className="flex flex-col items-center w-full">
          <Header className="bg-white-A700 flex flex-col items-center justify-center md:px-5 w-full" />
        </div>
        <div className="bg-white-A700 flex flex-col items-center justify-start p-[49px] md:px-5 rounded-bl-[70px] rounded-tl-[70px] w-[63%] md:w-full">
          <div className="flex flex-col gap-[5px] items-center justify-start w-[7%] md:w-full">
            <Img
              className="h-[30px] md:h-auto object-cover"
              src="images/img_image3.png"
              alt="imageThree_One"
            />
            <Text
              className="text-[14.39px] text-teal-A400"
              size="txtPromptSemiBold739"
            >
              SENCHAT
            </Text>
          </div>
          <div className="flex flex-col gap-11 items-center justify-start w-full">
            <div className="flex flex-col gap-[17.51px] items-center justify-start w-auto">
              <Text
                className="sm:text-[31.020000000000003px] md:text-[33.02px] text-[35.02px] text-black-900 w-auto"
                size="txtPromptSemiBold3502"
              >
                Create Account
              </Text>
              <Text
                className="text-[17.51px] text-gray-600 tracking-[0.18px] w-auto"
                size="txtPromptRegular1751"
              >
                Let’s Get You Started
              </Text>
            </div>
            <div className="flex flex-col gap-[21.88px] items-start justify-start w-full">
              <div className="flex flex-col gap-[8.75px] items-start justify-start w-full">
                <Text
                  className="text-[15.32px] text-gray-800 w-auto"
                  size="txtPromptMedium1532"
                >
                  Username:
                </Text>
                <Input
                  name="frameFour"
                  placeholder="Choose a username"
                  className="leading-[normal] p-0 placeholder:text-gray-600 sm:pr-5 text-[15.32px] text-gray-600 text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid pl-[17px] pr-[35px] py-3 rounded-lg w-full"
                  type="text"
                ></Input>
              </div>
              <div className="flex flex-col gap-[8.75px] items-start justify-start w-full">
                <Text
                  className="text-[15.32px] text-gray-800 w-auto"
                  size="txtPromptMedium1532"
                >
                  Email
                </Text>
                <Input
                  name="frameFour_One"
                  placeholder="Enter email"
                  className="leading-[normal] p-0 placeholder:text-gray-600 text-[15.32px] text-gray-600 text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid pl-[17px] pr-3 py-3 rounded-lg w-full"
                  type="email"
                ></Input>
              </div>
              <Button
                onClick={connectToWeb3}
                className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
                Connect to Web3
              </Button>
              {message && (
                <div className="text-green-600">{message}</div>
              )}
              <Button onClick={generateNonceAndSign} 
              className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
               
                Sign and Verify
                
              </Button>
              {successMessage && (
                <div className="text-green-600">{successMessage}</div>
              )}
              
              <div className="flex flex-col font-roboto items-start justify-start w-full">
                <CheckBox
                  className="font-medium leading-[normal] text-[15.32px] text-gray-800 text-left"
                  inputClassName="border border-blue_gray-100 border-solid h-[15px] mr-[5px] rounded-sm w-[15px]"
                  name="accepttermsand"
                  id="accepttermsand"
                  label="Accept terms and privacy policy"
                ></CheckBox>
              </div>
            </div>
            <div className="flex flex-col gap-[17.51px] h-[148px] md:h-auto items-start justify-start w-full">
              <a
                href="/education"
                className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
                <Button
                // className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
                >
                  Sign up
                </Button>
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-[4.38px] items-center justify-start mb-4 mt-[27px] w-full">
            <Text
              className="text-[15.32px] text-gray-600 w-full text-center"
              size="txtPromptMedium1532Gray600"
            >
              Already have an account?{" "}
            </Text>
            <a
              href="/signin"
              className="text-[15.32px] text-teal-A400 w-full text-center"
            >
              <Text size="txtPromptMedium1532TealA400">Sign in</Text>
            </a>
          </div>
        </div>
      </div>
    /* </WagmiConfig> */
  );
};

export default Signup;
