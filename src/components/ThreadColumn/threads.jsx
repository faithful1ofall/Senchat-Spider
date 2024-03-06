import React, { useEffect, useState } from "react";
import { Button, Img, Text } from "components";
import { readContract, writeContract } from 'wagmi/actions';
import { useConfig, useAccount  } from 'wagmi';
import ContractABI from '../../utils/contractabi.json';
import { NFTStorage, File } from 'nft.storage';
import { bsc } from 'wagmi/chains';
import { parseGwei } from 'viem';


const Thread = (props) => {
  const [thread1, setThread] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userlike, setUserlike] = useState(false);
  const [likeid, setLikeid] = useState();
  const config = useConfig();
  const nftcontract = process.env.REACT_APP_NFTCONTRACT;
  const [likecount, setLikeCount] = useState(0);
  const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [filetype, setFiletype] = useState(null);

  const cid = localStorage.getItem('cid');
  const tid = localStorage.getItem('tid');
  const account = useAccount();
  const chainId = bsc.id;

  const userDataParam = localStorage.getItem('userData');

  const userData = JSON.parse(userDataParam);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenuri = await readContract(config, {
          address: nftcontract,
          abi: ContractABI,
          functionName: 'tokenURI',
          args: [`3${tid}${likecount}`]
        });

        

        const startsWithb3 = tokenuri.startsWith("ipfs://")
          if (startsWithb3) {
            try {
              const hash = tokenuri.replace('ipfs://', '');
  
  
              const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${hash}`;
              const response = await fetch(cloudflareUrl);
  
              if (!response.ok) {
                throw new Error(`Failed to fetch from IPFS. Status: ${response.status}`);
              }
  
              const jsonData = await response.json();
              if (jsonData.address === account.address) {
                setUserlike(true);
                setLikeid(`3${tid}${likecount}`)
              }
            } catch (error) {
              console.error(`Error fetching from IPFS: ${error.message}`);
            }
          }

          setLikeCount(prevCount => prevCount + 1);
      } catch (error) {
        if (likecount === 0) {
          setLikeCount("")
        }
        console.log(likecount);
      }
    };
    fetchData();
  }, [likecount, tid, nftcontract, config, account.address]);

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
  });

  const like = async() => {
    setIsLoading(true);

    if (userlike) {
      try{
        await writeContract(config, {
          address: nftcontract,
          abi: ContractABI,
          functionName: 'burn',
          args: [likeid],
        });
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
      setIsLoading(false);
      return;
    }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      if (account.isConnected) {

        const reader = new FileReader();

        reader.onload = async () => {

          const content = reader.result;

          const image = new File([new Uint8Array(content)], filename, { type: filetype });

          const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

          const likeData = {
            image,
            name: `SEN_CHAT_LIKE`,
            postid: tid,
            likeid: `3${tid}${likecount}`,
            username: userData.name,
            description: 'like',
            userimage: userData.image,
            date: formattedDate,
            address: account.address,
            chainId: chainId,
          };

          const response = await nftstorage.store(
            likeData
          );

          console.log(response);

          try {
            await writeContract(config, {
             address: nftcontract,
             abi: ContractABI,
             functionName: 'userMint',
             args: [account.address, `3${tid}${likecount}`, `${response.url}`],
             value: parseGwei('100000'),
           });
           setSuccessMessage('Successfully minted the like');
           setIsLoading(false);
         } catch (error) {
           setIsLoading(false);
           setErrorMessage(`Insufficient balance/Rejected Transaction`);
           nftstorage.delete(response.ipnft);
         };

        }
        reader.readAsArrayBuffer(selectedFile);

      } else {
        setIsLoading(false);
        setErrorMessage('Account Not Connected or Retry clicking again');
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);  
        console.error('Account not connected');
      }
      setSuccessMessage("Your like has been sent! for minting");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);   
  }

  const data = async () => {
    const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${cid}`;
              const response = await fetch(cloudflareUrl);
  
              if (!response.ok) {
                throw new Error(`Failed to fetch from IPFS. Status: ${response.status}`);
              }
  
              const jsonData = await response.json();



              let imageurl = '';

              let videourl = '';

             if (jsonData.image) {
              const image = jsonData.image.replace('ipfs://', '');
              imageurl = `https://cloudflare-ipfs.com/ipfs/${image}`;
              const fileName = image.split('/').pop();
              console.log(fileName);
             }

             if (jsonData.video) {
              const video = jsonData.video.replace('ipfs://', '');
              videourl = `https://cloudflare-ipfs.com/ipfs/${video}`;
             }
              let userImageUrl = '';
              if (jsonData.userimage) {
                const userimage = jsonData.userimage.replace('ipfs://', '');
                userImageUrl = `https://cloudflare-ipfs.com/ipfs/${userimage}`;

                }
              const dateObject = new Date(jsonData.date);
              const hours = dateObject.getHours();
              const minutes = dateObject.getMinutes();
              const date = dateObject.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
            

              setThread(() => [
                { 
                  image: imageurl || false,
                  video: videourl || false,
                  userimage: userImageUrl,
                  titleofprops: jsonData.description, 
                  description: jsonData.description,
                  anasabdin: jsonData.username, 
                  education: 'Feeds', 
                  time: `${hours}:${minutes} ${date}`, 
                  repliescounter13: 'Replies Counter',
                  anasabdinone10: 'Anas Abdin One',
                  like: "Like",
                  quote: "Quote",
                  reply: "Reply",
                },
              ]);
  }

  useEffect(() => {
    data();
  }, []);


    const handleShare = async () => {
      try {
        if (navigator.share) {
          const item = thread1[0];
          await navigator.share({title: item.anasabdin, text: thread1[0].description, url: thread1[0].data  });
          console.log('Shared successfully');
        } else {
          console.log('Web Share API not supported');
        }
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    };
  

  return (
    <>
      <div className={props.className}>
      {Array.isArray(thread1) ? (
        thread1.map((thread, index) => (
        <div key={index} className="flex md:flex-col flex-row md:gap-5 items-center justify-evenly w-full">
          <div className="bg-gray-200 flex md:flex-1 flex-col items-center justify-start p-10 sm:px-5 w-[23%] md:w-full">
            <Img
                  src={thread?.userimage}
                  alt="Image Alt Text"
                  className="h-[46px] w-[46px] rounded-[10px]"
                />
            <Text
              className="mt-[11px] text-black-900 text-xl"
              size="txtPromptMedium20"
            >
              {thread?.anasabdin}
            </Text>
            <Text
              className="mb-[330px] text-teal-A400 text-xl"
              size="txtPromptSemiBold20"
            >
              {thread?.anasabdin}
            </Text>
          </div>
          <div className="flex md:flex-1 flex-col items-center justify-start w-[78%] md:w-full">
            <div className="bg-black-900 flex flex-row sm:gap-10 items-center justify-between p-5 w-full">
              <Text
                className="text-[17px] text-teal-A400"
                size="txtPromptMedium17TealA400"
              >
                {thread?.time}
              </Text>
              <div className="flex flex-row items-start justify-center mr-4" onClick={handleShare}>
                <Img
                  onClick={handleShare}
                  className="h-[22px] mt-[3px] cursor-pointer"
                  src="../../images/img_search_teal_a400.svg"
                  alt="share"
                />
              </div>
            </div>
            <div className="bg-white-A700 flex flex-col gap-6 items-start justify-start max-w-[808px] p-5 w-full">
              <Text
                className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                size="txtPromptRegular24"
              >
                {thread?.description}
              </Text>
              {thread?.video && <video controls src={thread?.video} className="cursor-pointer h-[260px] w-[260px]" />}
              {thread?.image && <Img src={thread?.image} alt="Image Alt Text" className="cursor-pointer h-[260px] w-[260px]" />}
              <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-start w-[51%] md:w-full">
                <Button
                  onClick={like}
                  className="bg-black-900 cursor-pointer flex items-center justify-center min-w-[109px] px-5 py-3.5 rounded-[7px]"
                  leftIcon={
                    <div className="mr-[7px] bg-black-A700 my-[3px]">
                      <Img src="../../images/img_edit_white_a700.svg" alt="edit"/>
                    </div>
                  }
                >
                  <div className="font-medium font-prompt leading-[normal] text-left text-lg text-white-A700">
                    
                  {isLoading ? (
                  <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                  ) : ( 
                    userlike ? `Unlike ${likecount}` :`${thread?.like} ${likecount}`
                  )}
                    
                  </div>
                </Button>
                <Button
                  className="bg-black-900 cursor-pointer flex items-center justify-center min-w-[108px] sm:ml-[0] ml-[30px] px-3 py-3.5 rounded-[7px]"
                  leftIcon={
                    <div className="h-[21px] mr-[7px] w-[21px] bg-dark-A700 my-[3px]">
                      <Img
                        className="h-[21px]"
                        src="../../images/img_grid.svg"
                        alt="grid"
                      />
                    </div>
                  }
                >
                  <div className="font-medium font-prompt leading-[normal] text-left text-lg text-white-A700">
                    {thread?.quote}
                  </div>
                </Button>
                
                  <Button
                    className="bg-teal-A400 cursor-pointer flex items-center justify-center min-w-[108px] sm:ml-[0] ml-[31px] pl-[15px] pr-[11px] py-3.5 rounded-[7px]"
                    leftIcon={
                      <div className="mt-px mb-[5px] mr-[7px] bg-dark-A700">
                        <Img src="../../images/img_reply.svg" alt="reply" />
                      </div>
                    }
                  >
                    <div className="font-medium font-prompt leading-[normal] text-left text-lg text-white-A700">
                      {thread?.reply}
                    </div>
                  </Button>
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
               
              </div>
            </div>
          </div>
        </div>
          ))
          ) : (
            <div>No Feeds available</div>
          )}
      </div>
    </>
  );
};

export default Thread;
