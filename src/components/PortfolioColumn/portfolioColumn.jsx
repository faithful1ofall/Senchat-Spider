import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line, Text, Img, Button } from "components";
import ContractABI from '../../utils/contractabi.json';
import { useConfig, useAccount } from 'wagmi';
import { readContract, writeContract  } from 'wagmi/actions';
import { NFTStorage } from 'nft.storage';


const PortfolioColumn = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [threadData1, setthreadData] = useState([]);
    const config = useConfig();
    const nftcontract = process.env.REACT_APP_NFTCONTRACT;
    const account = useAccount();   

    

    useEffect(() => {

        const func = async (index) => {

            const tokenId = await readContract(config, {
                address: nftcontract,
                abi: ContractABI,
                functionName: 'tokenOfOwnerByIndex',
                args: [account.address, index]
            });
            

            const tokenURI = await readContract(config, {
                address: nftcontract,
                abi: ContractABI,
                functionName: 'tokenURI',
                args: [`${tokenId}`]
            });

            const startsWithB2 = tokenId.toString().startsWith("2")

            if (startsWithB2) {
                return {
                    tokenId,
                    tokenURI,
                };
            } else {
                return null;
            }

    };

     const fetchAllTokenDetails = async (startIndex, endIndex) => {
        const allTokenDetails = [];

        // Create an array of promises for concurrent execution
        const promises = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => func(endIndex - i));

        // Use Promise.all to wait for all promises to resolve
        const results =  await Promise.all(promises);

        // Filter out null results (errors) and add valid results to the array
        results.filter((result) => result !== null).forEach((result) => allTokenDetails.push(result));


        return allTokenDetails;
    }

    const Total = async () => {


        const totalSupply =  await readContract(config, {
            address: nftcontract,
            abi: ContractABI,
            functionName: 'balanceOf',
            args: [account.address]

        });

        const totalSupplyNumber = parseInt(totalSupply, 10);

        const allTokenDetails = await fetchAllTokenDetails(0, totalSupplyNumber - 1);


        const threadData = [];

        for (const tokenDetail of allTokenDetails) {


            if (tokenDetail !== undefined && tokenDetail.tokenId !== undefined && tokenDetail.tokenURI !== undefined) {

                const startsWithb3 = tokenDetail.tokenURI.startsWith("ipfs://")
                if (startsWithb3) {
                    try {
                        const hash = tokenDetail.tokenURI.replace('ipfs://', '');


                        const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${hash}`;
                        const response = await fetch(cloudflareUrl);

                        if (!response.ok) {
                            throw new Error(`Failed to fetch from IPFS. Status: ${response.status}`);
                        }

                        const jsonData = await response.json();

                        const image = jsonData.image.replace('ipfs://', '');
                        const imageurl = `https://cloudflare-ipfs.com/ipfs/${image}`;


                        let userImageUrl = '';
                        if (jsonData.userimage) {
                            const userimage = jsonData.userimage.replace('ipfs://', '');
                            userImageUrl = `https://cloudflare-ipfs.com/ipfs/${userimage}`;
                        }


                        const dateObject = new Date(jsonData.date);
                        const hours = dateObject.getHours();
                        const minutes = dateObject.getMinutes();
                        const date = dateObject.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });

                        threadData.push(
                            {
                                data: imageurl,
                                titleofprops: jsonData.username,
                                anasabdin: jsonData.description,
                                education: 'Feeds',
                                userimage: userImageUrl,
                                time: `${hours}:${minutes} ${date}`,
                                cid: hash,
                                tid: tokenDetail.tokenId,
                                repliescounter13: '',
                                anasabdinone10: jsonData.username,
                            },
                        );

                    } catch (error) {
                        console.error(`Error fetching from IPFS: ${error.message}`);
                    }
                }
            }
        };

        setthreadData(threadData);

    };

        Total();

    }, [account.address, config, nftcontract]);


    const del = async (tid, hashcid) => {

        setIsLoading(true);

        try {
            const hash1 = hashcid.split('/').slice(-2, -1)[0];

            console.log(hash1);

            const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY });


            const tokenId =  await writeContract(config, {
                address: nftcontract,
                abi: ContractABI,
                functionName: 'burn',
                args: [tid],
            });

                console.log(tokenId);

                if (tokenId) {
                    nftstorage.delete(hash1);
                    console.log(tokenId);
                    setIsLoading(false);
                    window.location.reload();
                }
        } catch (error) {
            setIsLoading(false);
            console.error(error.message);
        }

    };


    const extracttext = (text) => {
        if (text.length <= 350) {
            return text;
        } else {
            return text.substring(0, 350) + "...";
        }
    };


    return (
        <div className={props.className}>
            {Array.isArray(threadData1) ? (
                threadData1.map((thread, index) => (
                    <div key={index} className="flex flex-col gap-[20px] items-center w-full shadow-xl">
                        <div>{thread.titleofthread}</div>
                        
                        {/* <div>{thread.anasabdin}</div> */}

                        {/*   <Button className="bg-blue_gray-100 cursor-pointer font-prompt font-semibold h-[46px] leading-[normal] py-[7px] rounded-[10px] text-black-900 text-center text-xl w-[46px]">
                        {thread?.p}
                        </Button> */}
                        <div className="flex flex-1 md:flex-col flex-row gap-[16px] items-start justify-start max-w-[1039px] px-5 py-[15px] w-full"
                        >
                            <Img
                                src={thread?.userimage}
                                alt="Image Alt Text"
                                className="cursor-pointer h-[46px] w-[46px] rounded-[10px]"
                            />
                            <div className="flex md:flex-1 flex-col items-start justify-start w-[79%] md:w-full">
                                <div className="flex flex-col items-start justify-start w-[71%] md:w-full">
                                    <div className="flex flex-col items-center justify-start">
                                        <Text
                                            className="text-[17px] text-black-900"
                                            size="txtPromptSemiBold17"
                                        >
                                            {thread?.titleofprops}
                                        </Text>
                                    </div>
                                    <div className="flex flex-row gap-[7px] items-center justify-between w-full">
                                        <Link to={`/thread/${encodeURIComponent(thread.cid)}`}>
                                            <Text
                                                className="text-black-900 text-sm"
                                                size="txtPromptMedium14"
                                            >
                                                {extracttext(thread?.anasabdin)}

                                            </Text>
                                        </Link>
                                        {/* <Text
                      className="text-teal-A400 text-sm"
                      size="txtPromptMedium14"
                    >
                      {thread?.education}
                    </Text> */}
                                    </div>
                                    <Text
                                        className="text-gray-500_02 text-sm"
                                        size="txtPromptMedium14"
                                    >
                                        {thread?.time}

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
                                            {thread?.repliescounter13}
                                        </Text>
                                        <Text
                                            className="text-gray-500_02 text-sm"
                                            size="txtPromptMedium14"
                                        >
                                            {thread?.anasabdinone10}
                                        </Text>
                                        <Button onClick={() => del(thread?.tid, thread?.cid)} className="bg-red-600 cursor-pointer font-semibold leading-[normal] mb-1 min-w-[146px] md:ml-[0] ml-[54px] md:mt-0 mt-[35px] py-3 rounded-[15px] text-[16.34px] text-black-900 text-center tracking-[-0.49px]">
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                                                </div>
                                            ) : (
                                                'DELETE'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Line className="self-center h-px bg-teal-100 w-full" />
                    </div>
                ))
            ) : (
                <div>No Feeds available</div>
            )}
        </div>
    );
};
export default PortfolioColumn;
