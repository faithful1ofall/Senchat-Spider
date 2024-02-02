import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Img, Input, Text } from "components";
import Header from "components/Header";
import { configureChains, createConfig, InjectedConnector, getAccount, readContract, writeContract } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { bscTestnet } from "viem/chains";
import { parseGwei, hexToBigInt } from 'viem';
import { createWeb3Modal, walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { NFTStorage, File} from 'nft.storage';
import ContractABI from '../../utils/contractabi.json';


const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZkZjE1M0U2ODEzZWZFNDRCNTEyMzU2REFGMjQ1NGE0YzAwYTMwN0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNjgzMjU5NzAzNiwibmFtZSI6IjFzdCBrZXkifQ._nwCM9oIRCYSLv4MW8_8Mtb6R0Lvr7XwsQrpCu0cSLg'


const Signup = () => {
  const [isConnected, setIsConnected] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const projectId = 'ee459e804dfa88ec1036d10ab882c4bf';
  const nftcontract ="0xe8746f49027FeCF2C9C4a8F6E60af2408e3420CD";
  const chainId = bscTestnet.id;
  const history = useNavigate();
  


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
const account = await getAccount();

  useEffect(() => {
    // Run checkAccountStatus initially when the component mounts
    if (account.isConnected) {
    setIsConnected(true);
  } else {
    setIsConnected(false);
    }

    // Set up a listener or polling mechanism for real-time updates
    const intervalId = setInterval(() => {
      if (account.isConnected) {
    setIsConnected(true);
  } else {
    setIsConnected(false);
  }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  

const connectToWeb3 = async () => {
    modal.open();
  if (account.isConnected) {
    setIsConnected(true);
  } else {
    setIsConnected(false);
  }
};

  
  const generateNonceAndSign = async () => {

    if (account.isConnected) {

      const imageOriginUrl = "https://senchatdapp.vercel.app/images/img_image3.png";
      const r = await fetch(imageOriginUrl);
      const rb = await r.blob();

      /* const data = await readContract({
        address: nftcontract,
        abi: ContractABI,
        functionName: 'symbol',
      }); */

      const big = hexToBigInt(account.address);
      const data = await readContract({
                address: nftcontract,
                abi: ContractABI,
                functionName: 'tokenURI',
                args: [`1${big}`]
              });


      

  
      console.log("data ", data);
      const reader = new FileReader();

      reader.onload = async () => {
            const content = reader.result;
 
            const image = new File([new Uint8Array(content)], 'senchatlogo.png', { type: 'image/png' });

            const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

            const signupData = {
              image,
              name: username,
              description: `email: ${email}`,
              address: account.address,
              chainId: chainId
            };

            if (!data) {
              var response = await nftstorage.store(
                signupData
              )
          };

          try{
          const hash = await writeContract({
          address: nftcontract,
          abi: ContractABI,
          functionName: 'userMint',
          args: [account.address, `1${big}`, `ipfs://${response.ipnft}`],
          value: parseGwei('100'),
          });

          if (hash) {
            setSuccessMessage('Successfully signed and verified');
            history.push('/education');
          };
        } catch (error) {
          setSuccessMessage('Account Alread Exist and verified try signing in'); 
          history.push('/signin');         
        };

      }
      
      reader.readAsArrayBuffer(rb);


    } else {
      console.error('Signature verification failed');
    }

  };

  const handleChange = (e) => {
    if (e) {
      setUsername(e);
    } else {
      console.error('Invalid event or value:', e);
    }
  }
  const handleChangeemail = (e) => {
    if (e) {
      setEmail(e);
    } else {
      console.error('Invalid event or value:', e);
    }
  }

  return (
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
                  onChange={handleChange}  
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
                  onChange={handleChangeemail}  
                ></Input>
              </div>
              <Button
                onClick={connectToWeb3}
                className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
                {isConnected ? "Connected" : "Connect to Web3"}
              </Button>
              <Button 
              onClick={generateNonceAndSign}
              className="bg-teal-A400 cursor-pointer font-medium leading-[normal] min-w-full py-[19px] rounded-[32px] text-[17.51px] text-black-900 text-center"
              >
               
                Sign and Verify
                
              </Button>
              {successMessage && (
                <div className="text-green-600">{successMessage}</div>
              )}
              
              {/* <div className="flex flex-col font-roboto items-start justify-start w-full">
                <CheckBox
                  className="font-medium leading-[normal] text-[15.32px] text-gray-800 text-left"
                  inputClassName="border border-blue_gray-100 border-solid h-[15px] mr-[5px] rounded-sm w-[15px]"
                  name="accepttermsand"
                  id="accepttermsand"
                  label="Accept terms and privacy policy"
                ></CheckBox>
              </div> */}
            </div>
            {/* <div className="flex flex-col gap-[17.51px] h-[148px] md:h-auto items-start justify-start w-full">
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
            </div> */}
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
  );
};

export default Signup;
