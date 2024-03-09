import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats } from "./MessageEditor";
import "./messageEditor.css";
import { Img, Text } from "components";
import { readContract, writeContract } from 'wagmi/actions';
import { useAccount, useConfig  } from 'wagmi';
import { parseGwei } from 'viem';
import { NFTStorage, File } from 'nft.storage';
import ContractABI from '../../utils/contractabi.json';
import { sha256 } from 'js-sha256';
import { defineChain } from 'viem';

const BotanixTestnet = defineChain({
  id: 3636,
  name: 'BotanixTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://node.botanixlabs.dev']
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://3xpl.com/botanix' },
  },
  testnet: true
})

const Message = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [filetype, setFiletype] = useState(null);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nftcontract = process.env.REACT_APP_NFTCONTRACT;
  const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
  
  const [count, setCount] = useState(0);

  const config = useConfig();

  const account = useAccount();
  const chainId = BotanixTestnet.id;

  const userDataParam = localStorage.getItem('userData');

  const userData = JSON.parse(userDataParam);

  // const handleAlert = () => {
  //   setAlertMessage("Your post has been sent!");
  //   setTimeout(() => {
  //     setAlertMessage("");
  //   }, 3000);
  // };

  const hashAccount = (account) => {
    const hashedAccount = sha256(account.toString());
    return hashedAccount;
  };

  const extractDigits = (text) => {
    const numericalCharacters = text.match(/\d/g);
    if (!numericalCharacters) return '';
    return numericalCharacters.join('');
  };

  const getFirst10Digits = (text) => {
    return text.substring(0, 10);
  };

  const hashedAccount = hashAccount(account.address.toString());
  const numericalCharacters = extractDigits(hashedAccount);
  const big = getFirst10Digits(numericalCharacters);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await readContract(config, {
          address: nftcontract,
          abi: ContractABI,
          functionName: 'tokenURI',
          args: [`2${big}${count}`]
        });
        setCount(prevCount => prevCount + 1);
      } catch (error) {
        console.log(count);
      }
    };

    fetchData();
  }, [count, big, nftcontract, config]);

  /*   const handleChange = () => {
      const messageValue = e.target.children[0].childNodes[1].firstElementChild.textContent;
      setMessage(messageValue);
      console.log(messageValue);
    }; */

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFile && !filename) {
        const imageOriginUrl = process.env.REACT_APP_LOGO;
        const r = await fetch(imageOriginUrl);
        const rb = await r.blob();
        setSelectedFile(rb);
        setFilename('senchatlogo.png');
        setFiletype('image/png');
      }
    };
    fetchData();
  }, [selectedFile, filename]);

  const handleFileChange = () => {
    const doc = document.querySelector('#fileInput');
    setSelectedFile(doc.files[0]);
    setFilename(doc.files[0].name);
    setFiletype(doc.files[0].type);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const messageValue = e.target.children[0].childNodes[1].firstElementChild.textContent;
    setMessage(messageValue)
    if (messageValue.trim() === "") {
      console.log(messageValue);
      setErrorMessage("This field cant be empty!");
      setTimeout(() => {
        setErrorMessage("");
        setIsLoading(false);
      }, 3000);
    } else {

      console.log(messageValue);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      if (account.isConnected) {

        const reader = new FileReader();

        reader.onload = async () => {

          const content = reader.result;

          const image = new File([new Uint8Array(content)], filename, { type: filetype });

          const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

          const postData = {
            image,
            name: `SEN_CHAT_POST`,
            username: userData.name,
            description: messageValue,
            userimage: userData.image,
            date: formattedDate,
            address: account.address,
            chainId: chainId,
          };

          const response = await nftstorage.store(
            postData
          );

          console.log(response);

          try {
             await writeContract(config, {
              address: nftcontract,
              abi: ContractABI,
              functionName: 'userMint',
              args: [account.address, `2${big}${count}`, `${response.url}`],
              value: parseGwei('100000'),
            });
            setSuccessMessage('Successfully minted the post');
          } catch (error) {
            setIsLoading(false);
            setErrorMessage(`Insufficient balance/Rejected Transaction`);
            nftstorage.delete(response.ipnft);
          };

        }
        reader.readAsArrayBuffer(selectedFile);

      } else {
        setIsLoading(false);
        setErrorMessage('Account Not Connected')
        console.error('Account not connected');
      }
      setSuccessMessage("Your post has been sent! for minting");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setMessage("");
    }
  };

  const modules = {
    toolbar: {
      container: [

      ],
    },

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <>
      {/* <Navbar className="flex md:flex-col flex-row md:gap-5 items-center justify-center mb-0.5 md:px-5 w-full" /> */}

      <div className="bg-gray-100 flex flex-col font-prompt items-center justify-end mx-auto">
        <div className="flex flex-col gap-[11px] items-center justify-start  mt-[3px] mx-auto pb-[14px] md:px-5 w-full">
          <div className="bg-gray-100 flex flex-col gap-1.5 justify-center pl-1 py-1 w-full">
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
            />
            <label className="text-[15.32px] text-gray-800 w-auto relative overflow-hidden border border-gray-300 px-3 py-2 rounded cursor-pointer">
              <span>Select a file</span>
              <input
                type="file"
                id="fileInput"
                className="absolute inset-0 opacity-0"
                onChange={handleFileChange}
              />
            </label>
            <p>{filename}</p>
                                       
              <button
                type="submit"
                className="bg-cyan-300 py-2 px-3 rounded-md mt-5 "
              >
                  {isLoading ? (
                  <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                  ) : (  
                    'Submit'
                  )}
              </button>
             
          </form>
        </div>
      </div>
    </>
  );
};

export default Message;
